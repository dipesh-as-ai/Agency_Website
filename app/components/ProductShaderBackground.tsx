"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------
// SHADER LIBRARY
// ---------------------------------------------------------------
const LIGHT_DIR = new THREE.Vector3(0.45, 0.85, 0.6).normalize();
const SWEEP_DIR = new THREE.Vector2(0.72, -0.7).normalize();

const COMMON_GLSL = `
float edgeFactor(vec2 uv, float w){
  float d = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  return 1.0 - smoothstep(0.0, w, d);
}
float sweepBand(vec3 worldPos, vec2 dir, float pos, float width){
  float d = dot(worldPos.xy, dir) - pos;
  return smoothstep(width, 0.0, abs(d));
}
`;

const VERT_SHARED = `
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vWorldPos;
varying float vFrontMask;
void main(){
  vUv = uv;
  vFrontMask = step(0.85, normal.z);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = -mvPos.xyz;
  gl_Position = projectionMatrix * mvPos;
}
`;

const TILE_FRAG = COMMON_GLSL + `
uniform vec3 colorA; uniform vec3 colorB; uniform vec3 lightDir;
uniform vec2 sweepDir; uniform float sweepPos;
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vViewDir; varying vec3 vWorldPos;
void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float ndl = max(dot(N, lightDir), 0.08);
  float t = clamp((vWorldPos.y + 6.0) / 12.0, 0.0, 1.0);
  vec3 base = mix(colorB, colorA, t);
  vec3 col = base * (0.55 + 0.55 * ndl);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  col += fres * 0.08;
  col += edgeFactor(vUv, 0.09) * 0.10;
  col += sweepBand(vWorldPos, sweepDir, sweepPos, 1.7) * vec3(1.0, 0.97, 1.0) * 0.5;
  gl_FragColor = vec4(col, 1.0);
}
`;

const CARD_FRAG = COMMON_GLSL + `
uniform float uTime; uniform float uPop;
uniform vec3 colorTop; uniform vec3 colorBottom; uniform vec3 lightDir;
uniform vec2 sweepDir; uniform float sweepPos;
uniform sampler2D uText;
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vViewDir; varying vec3 vWorldPos; varying float vFrontMask;
void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float ndl = max(dot(N, lightDir), 0.12);
  vec3 base = mix(colorBottom, colorTop, vUv.y);
  vec3 col = base * (0.62 + 0.5 * ndl);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  col += fres * vec3(0.55, 0.62, 1.0) * (0.3 + 0.45 * uPop);
  float diag = vUv.x + vUv.y;
  float phase = fract(uTime * 0.14);
  float center = phase * 2.6 - 0.3;
  float shine = smoothstep(0.20, 0.0, abs(diag - center));
  col += shine * 0.4 * (0.5 + 0.5 * uPop);
  float spec = pow(max(dot(reflect(-lightDir, N), V), 0.0), 60.0);
  col += spec * 0.6;
  col += edgeFactor(vUv, 0.06) * 0.22;
  col += sweepBand(vWorldPos, sweepDir, sweepPos, 1.4) * 0.55;
  vec4 tex = texture2D(uText, vUv);
  col = mix(col, vec3(1.0), tex.a * vFrontMask);
  gl_FragColor = vec4(col, 1.0);
}
`;

const GLOSS_FRAG = COMMON_GLSL + `
uniform vec3 lightDir; uniform vec3 baseColor;
uniform vec2 sweepDir; uniform float sweepPos;
varying vec3 vNormalW; varying vec3 vViewDir; varying vec3 vWorldPos;
void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float ndl = max(dot(N, lightDir), 0.1);
  float top = smoothstep(-0.3, 1.0, N.y);
  vec3 base = mix(baseColor * 0.8, vec3(1.0), top);
  vec3 col = base * (0.55 + 0.55 * ndl);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.1);
  col += fres * 0.55;
  float spec = pow(max(dot(reflect(-lightDir, N), V), 0.0), 45.0);
  col += spec * 0.85;
  col += sweepBand(vWorldPos, sweepDir, sweepPos, 1.3) * 0.4;
  gl_FragColor = vec4(col, 1.0);
}
`;

const GLASS_FRAG = `
uniform vec3 lightDir;
varying vec3 vNormalW; varying vec3 vViewDir;
void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.2);
  float spec = pow(max(dot(reflect(-lightDir, N), V), 0.0), 90.0);
  gl_FragColor = vec4(vec3(1.0), fres * 0.3 + spec * 0.5);
}
`;

// Geometry Helpers
function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function roundedBoxGeo(w: number, h: number, r: number, depth: number, bevel?: number) {
  const b = bevel === undefined ? Math.min(0.05, depth * 0.3) : bevel;
  const shape = roundedRectShape(w, h, r);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 1,     // Fix 3: reduced from 3 (imperceptible at viewing distance)
    curveSegments: 6,     // Fix 3: reduced from 10 (saves ~40% vertex count)
  });
  geo.center();
  return geo;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function circleIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, fillStyle: string | CanvasGradient) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

export default function ProductShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ---------------------------------------------------------------
    // THREE.JS SETUP
    // ---------------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5)); // Fix 2: capped at 1.5 — 3D bg doesn't need retina sharpness
    renderer.setClearColor(0xefe3f7, 0.45);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    const sweepUniformTargets: THREE.ShaderMaterial[] = [];

    function makeUniforms(extra?: Record<string, { value: any }>) {
      const u: Record<string, { value: any }> = {
        lightDir: { value: LIGHT_DIR },
        sweepDir: { value: SWEEP_DIR },
        sweepPos: { value: -6 },
      };
      if (extra) {
        for (const k in extra) u[k] = extra[k];
      }
      return u;
    }

    function tileMaterial(colorA: string, colorB: string) {
      const m = new THREE.ShaderMaterial({
        uniforms: makeUniforms({
          colorA: { value: new THREE.Color(colorA) },
          colorB: { value: new THREE.Color(colorB) },
        }),
        vertexShader: VERT_SHARED,
        fragmentShader: TILE_FRAG,
      });
      sweepUniformTargets.push(m);
      return m;
    }

    function glossMaterial(color: string) {
      const m = new THREE.ShaderMaterial({
        uniforms: makeUniforms({ baseColor: { value: new THREE.Color(color) } }),
        vertexShader: VERT_SHARED,
        fragmentShader: GLOSS_FRAG,
      });
      sweepUniformTargets.push(m);
      return m;
    }

    const glassMat = new THREE.ShaderMaterial({
      uniforms: { lightDir: { value: LIGHT_DIR } },
      vertexShader: VERT_SHARED,
      fragmentShader: GLASS_FRAG,
      transparent: true,
      depthWrite: false,
    });

    // ---------------------------------------------------------------
    // 3D WORLD CREATION
    // ---------------------------------------------------------------
    const world = new THREE.Group();
    scene.add(world);

    // Tiles Group
    const tilesGroup = new THREE.Group();
    world.add(tilesGroup);

    const TILE_PALETTE = [
      ["#efe6fb", "#d9b9ee"],
      ["#eee2fa", "#c9b6f2"],
      ["#f1e6f9", "#e1b9e6"],
      ["#e9e2fb", "#b6a6ef"],
    ];
    const TILE_DEFS = [
      [-4.6, 3.0, 5.0, 4.0, -1.0, 0.55],
      [1.2, 3.5, 5.0, 3.3, -1.3, 0.42],
      [-4.8, -2.4, 4.7, 4.1, -0.8, 0.6],
      [0.9, -1.1, 4.9, 3.3, -1.15, 0.46],
      [5.7, 2.9, 3.1, 4.0, -1.2, 0.5],
      [5.7, -2.1, 3.3, 4.6, -0.9, 0.55],
      [-1.0, -4.2, 4.6, 2.6, -1.4, 0.4],
      [3.3, -4.3, 3.7, 2.4, -1.05, 0.48],
      [-6.9, 0.3, 2.5, 5.6, -0.7, 0.6],
    ];

    TILE_DEFS.forEach((def, i) => {
      const pal = TILE_PALETTE[i % TILE_PALETTE.length];
      const geo = roundedBoxGeo(def[2], def[3], 0.22, def[5]);
      const mat = tileMaterial(pal[0], pal[1]);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(def[0], def[1], def[4]);
      tilesGroup.add(mesh);
    });

    // ---------------------------------------------------------------
    // PHONE & CARD
    // ---------------------------------------------------------------
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(0.4, 0.0, 0);
    phoneGroup.rotation.z = THREE.MathUtils.degToRad(-19);
    world.add(phoneGroup);

    const PHONE_W = 2.05, PHONE_H = 4.35, PHONE_DEPTH = 0.42;
    const bodyGeo = roundedBoxGeo(PHONE_W, PHONE_H, 0.42, PHONE_DEPTH, 0.06);
    const bodyMat = glossMaterial("#e9e4fb");
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    phoneGroup.add(bodyMesh);

    const INNER_W = PHONE_W * 0.90, INNER_H = PHONE_H * 0.93;
    const CANVAS_W = 640, CANVAS_H = 1360;
    const uiCanvas = document.createElement("canvas");
    uiCanvas.width = CANVAS_W;
    uiCanvas.height = CANVAS_H;
    const uiCtx = uiCanvas.getContext("2d")!;
    const uiTexture = new THREE.CanvasTexture(uiCanvas);
    uiTexture.minFilter = THREE.LinearFilter;

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(INNER_W, INNER_H),
      new THREE.MeshBasicMaterial({ map: uiTexture })
    );
    screenMesh.position.z = PHONE_DEPTH / 2 + 0.02;
    phoneGroup.add(screenMesh);

    const glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(INNER_W, INNER_H), glassMat);
    glassMesh.position.z = PHONE_DEPTH / 2 + 0.03;
    phoneGroup.add(glassMesh);

    // Card Slot Geometry
    const CARD_W = INNER_W * 0.90, CARD_H = INNER_H * 0.285;
    const CARD_Y = INNER_H * 0.5 - INNER_H * 0.135 - CARD_H / 2;

    function makeCardTextTexture() {
      const c = document.createElement("canvas");
      c.width = 640;
      c.height = 360;
      const ctx = c.getContext("2d")!;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = 'italic 700 56px Georgia, "Times New Roman", serif';
      ctx.textBaseline = "top";
      ctx.fillText("First Click", 46, 46);

      ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      const label = "REVENUE.ENGINE";
      let fx = 46;
      for (let fi = 0; fi < label.length; fi++) {
        ctx.fillText(label[fi], fx, 288);
        fx += ctx.measureText(label[fi]).width + 2.5;
      }

      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    }
    const cardTextTexture = makeCardTextTexture();

    const cardGeo = roundedBoxGeo(CARD_W, CARD_H, 0.16, 0.10, 0.035);
    const cardMat = new THREE.ShaderMaterial({
      uniforms: makeUniforms({
        uTime: { value: 0 },
        uPop: { value: 0 },
        colorTop: { value: new THREE.Color("#3552e0") },
        colorBottom: { value: new THREE.Color("#0d1f9e") },
        uText: { value: cardTextTexture },
      }),
      vertexShader: VERT_SHARED,
      fragmentShader: CARD_FRAG,
    });
    sweepUniformTargets.push(cardMat);

    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardMesh.position.set(0, CARD_Y, PHONE_DEPTH / 2 + 0.03);
    phoneGroup.add(cardMesh);

    const CARD_FLAT_Z = PHONE_DEPTH / 2 + 0.03;
    const CARD_POP_Z = PHONE_DEPTH / 2 + 1.35;

    // ---------------------------------------------------------------
    // PROPS: AirPods Case, AirPods Earbuds, Apple Pencil
    // ---------------------------------------------------------------
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x2a2735 });

    // AirPods Case
    const caseGroup = new THREE.Group();
    caseGroup.position.set(-3.5, 2.7, 0.15);
    caseGroup.rotation.z = THREE.MathUtils.degToRad(-12);
    world.add(caseGroup);

    const caseBodyGeo = roundedBoxGeo(1.55, 1.2, 0.34, 0.95, 0.14);
    const caseMesh = new THREE.Mesh(caseBodyGeo, glossMaterial("#f3f0fb"));
    caseGroup.add(caseMesh);

    const hingeGeo = new THREE.BoxGeometry(0.05, 0.55, 0.05);
    const hingeMesh = new THREE.Mesh(hingeGeo, darkMat);
    hingeMesh.position.set(-0.02, 0.15, 0.5);
    caseGroup.add(hingeMesh);

    const ledGeo = new THREE.CircleGeometry(0.035, 8);  // Fix 3: reduced segments
    const ledMesh = new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0x35323f }));
    ledMesh.position.set(0, -0.3, 0.485);
    caseGroup.add(ledMesh);

    // AirPods Earbuds
    const budsGroup = new THREE.Group();
    budsGroup.position.set(3.75, -1.85, 0.2);
    budsGroup.rotation.z = THREE.MathUtils.degToRad(-22);
    world.add(budsGroup);

    function makeBud() {
      const g = new THREE.Group();
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), glossMaterial("#f5f2fb")); // Fix 3: halved segments
      head.scale.set(1, 1.15, 0.85);
      g.add(head);

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.065, 0.62, 8), glossMaterial("#f0edf9")); // Fix 3
      stem.position.set(0, -0.44, 0.06);
      stem.rotation.x = THREE.MathUtils.degToRad(-14);
      g.add(stem);

      const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.06, 0.12, 8), darkMat); // Fix 3
      tip.position.set(0, -0.75, 0.09);
      tip.rotation.x = THREE.MathUtils.degToRad(-14);
      g.add(tip);

      const mic = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), darkMat); // Fix 3
      mic.position.set(0.02, 0.05, 0.27);
      g.add(mic);
      return g;
    }

    const bud1 = makeBud();
    bud1.position.set(-0.32, 0.18, 0);
    bud1.rotation.z = THREE.MathUtils.degToRad(18);
    budsGroup.add(bud1);

    const bud2 = makeBud();
    bud2.position.set(0.38, -0.28, 0.05);
    bud2.rotation.z = THREE.MathUtils.degToRad(-34);
    bud2.rotation.y = THREE.MathUtils.degToRad(20);
    budsGroup.add(bud2);

    // Apple Pencil
    const pencilGroup = new THREE.Group();
    pencilGroup.position.set(-5.15, -3.05, 0.12);
    pencilGroup.rotation.z = THREE.MathUtils.degToRad(72);
    world.add(pencilGroup);

    const pencilBody = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 3.1, 10), glossMaterial("#f4f1fa")); // Fix 3
    pencilGroup.add(pencilBody);

    const pencilBand = new THREE.Mesh(new THREE.CylinderGeometry(0.138, 0.138, 0.16, 10), darkMat); // Fix 3
    pencilBand.position.y = 0.55;
    pencilGroup.add(pencilBand);

    const pencilTip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.34, 10), glossMaterial("#d8d4e6")); // Fix 3
    pencilTip.position.y = -1.72;
    pencilGroup.add(pencilTip);

    const pencilNib = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 6), darkMat); // Fix 3
    pencilNib.position.y = -1.92;
    pencilGroup.add(pencilNib);

    // ---------------------------------------------------------------
    // 2D CANVAS UI TEXTURE DRAWING (Optimized: bake static once, partial dynamic redraw)
    // ---------------------------------------------------------------
    const seededBars = [0.12, 0.16, 0.14, 0.2, 0.24, 0.22, 0.3, 0.34, 0.4, 0.5, 0.62, 0.72, 0.85, 1.0];
    let staticBaked = false;

    // Bake static UI once (header, action row, labels, transactions) — never redrawn
    function drawStaticUI() {
      const w = CANVAS_W, h = CANVAS_H;
      uiCtx.clearRect(0, 0, w, h);
      rr(uiCtx, 0, 0, w, h, 46);
      uiCtx.fillStyle = "#ffffff";
      uiCtx.fill();

      // Header
      uiCtx.fillStyle = "#161522";
      uiCtx.font = '600 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.textAlign = "left";
      uiCtx.textBaseline = "middle";
      uiCtx.fillText("\u2190", 46, 96);
      uiCtx.textAlign = "center";
      uiCtx.font = '700 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.fillText("Pipeline", w / 2, 96);
      circleIcon(uiCtx, w - 78, 96, 32, "#ee5fa8");
      uiCtx.fillStyle = "#fff";
      uiCtx.font = '600 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.fillText("+", w - 78, 94);

      // Action Row (static buttons)
      uiCtx.textAlign = "center";
      const rowY = h * 0.505;
      const bx = [w * 0.225, w * 0.5, w * 0.775];
      const grad = uiCtx.createLinearGradient(bx[0] - 40, rowY - 40, bx[0] + 40, rowY + 40);
      grad.addColorStop(0, "#a86bf0");
      grad.addColorStop(1, "#ee5fa8");
      circleIcon(uiCtx, bx[0], rowY, 42, grad);
      uiCtx.fillStyle = "rgba(255,255,255,0.9)";
      uiCtx.beginPath();
      uiCtx.arc(bx[0], rowY, 10, 0, Math.PI * 2);
      uiCtx.fill();
      circleIcon(uiCtx, bx[2], rowY, 42, "#d9d6e8");
      circleIcon(uiCtx, bx[2], rowY, 9, "#8b87a3");

      uiCtx.fillStyle = "#4a4757";
      uiCtx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.fillText("Analytics", bx[0], rowY + 74);
      uiCtx.fillText("Settings", bx[2], rowY + 74);

      // Revenue Label (static part)
      const revY = h * 0.665;
      uiCtx.textAlign = "left";
      rr(uiCtx, 46, revY - 18, 34, 34, 9);
      uiCtx.fillStyle = "#37c98a";
      uiCtx.fill();
      uiCtx.fillStyle = "#fff";
      uiCtx.font = '700 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.textAlign = "center";
      uiCtx.fillText("₹", 63, revY + 1);
      uiCtx.textAlign = "left";
      uiCtx.fillStyle = "#7a7690";
      uiCtx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.fillText("Monthly Revenue Run-rate", 96, revY);

      // Divider
      uiCtx.strokeStyle = "#efedf6";
      uiCtx.lineWidth = 2;
      uiCtx.beginPath();
      uiCtx.moveTo(46, h * 0.755);
      uiCtx.lineTo(w - 46, h * 0.755);
      uiCtx.stroke();

      // Transactions Header
      const txY = h * 0.80;
      uiCtx.fillStyle = "#161522";
      uiCtx.font = '700 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.fillText("Recent conversions", 46, txY);
      uiCtx.fillStyle = "#9d9ab1";
      uiCtx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.textAlign = "right";
      uiCtx.fillText("Real-time", w - 46, txY);
      uiCtx.textAlign = "left";

      const rows = [
        { name: "Enterprise Retainer", amount: "+₹1,45,000", color: "#f0a1c9" },
        { name: "High-Ticket Funnel", amount: "+₹85,000", color: "#8fd6c9" },
      ];
      rows.forEach((row, i) => {
        const ry = txY + 66 + i * 118;
        circleIcon(uiCtx, 68, ry, 32, row.color);
        uiCtx.fillStyle = "#1c1a29";
        uiCtx.font = '600 23px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        uiCtx.fillText(row.name, 112, ry - 8);
        uiCtx.fillStyle = "#a29fb4";
        uiCtx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        uiCtx.fillText("Pipeline cleared", 112, ry + 20);
        uiCtx.textAlign = "right";
        uiCtx.fillStyle = "#1c1a29";
        uiCtx.font = '600 23px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        uiCtx.fillText(row.amount, w - 46, ry - 8);
        uiCtx.fillStyle = "#37c98a";
        uiCtx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        uiCtx.fillText("Completed", w - 46, ry + 20);
        uiCtx.textAlign = "left";
      });
    }

    // Draw only dynamic regions: middle action icon, revenue counter, sparkline
    function drawDynamicUI(state: { revenue: number; protectedOn: boolean; time: number }) {
      const w = CANVAS_W, h = CANVAS_H;

      // Bake static parts on first call
      if (!staticBaked) {
        drawStaticUI();
        staticBaked = true;
      }

      // --- Dynamic region 1: Middle action icon (protected/funnel toggle) ---
      const rowY = h * 0.505;
      const bx1 = w * 0.5;
      // Clear the middle icon region
      uiCtx.save();
      uiCtx.beginPath();
      uiCtx.arc(bx1, rowY, 44, 0, Math.PI * 2);
      uiCtx.clip();
      uiCtx.fillStyle = "#ffffff";
      uiCtx.fillRect(bx1 - 44, rowY - 44, 88, 88);
      if (state.protectedOn) {
        circleIcon(uiCtx, bx1, rowY, 42, "#37c98a");
        uiCtx.strokeStyle = "#fff";
        uiCtx.lineWidth = 5;
        uiCtx.lineCap = "round";
        uiCtx.lineJoin = "round";
        uiCtx.beginPath();
        uiCtx.moveTo(bx1 - 14, rowY);
        uiCtx.lineTo(bx1 - 3, rowY + 11);
        uiCtx.lineTo(bx1 + 16, rowY - 13);
        uiCtx.stroke();
      } else {
        circleIcon(uiCtx, bx1, rowY, 42, "#3aa0f2");
        uiCtx.strokeStyle = "#fff";
        uiCtx.lineWidth = 5;
        uiCtx.lineCap = "round";
        uiCtx.lineJoin = "round";
        uiCtx.beginPath();
        uiCtx.moveTo(bx1, rowY - 14);
        uiCtx.lineTo(bx1 - 13, rowY - 6);
        uiCtx.lineTo(bx1 - 13, rowY + 8);
        uiCtx.lineTo(bx1, rowY + 16);
        uiCtx.lineTo(bx1 + 13, rowY + 8);
        uiCtx.lineTo(bx1 + 13, rowY - 6);
        uiCtx.closePath();
        uiCtx.stroke();
      }
      uiCtx.restore();
      // Redraw middle label
      uiCtx.fillStyle = "#4a4757";
      uiCtx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.textAlign = "center";
      uiCtx.fillRect(bx1 - 80, rowY + 58, 160, 24);
      uiCtx.fillStyle = "#ffffff";
      uiCtx.fillRect(bx1 - 80, rowY + 58, 160, 24);
      uiCtx.fillStyle = "#4a4757";
      uiCtx.fillText(state.protectedOn ? "Optimized" : "Funnel Engine", bx1, rowY + 74);

      // --- Dynamic region 2: Revenue counter ---
      const revY = h * 0.665;
      // Clear revenue number area
      uiCtx.fillStyle = "#ffffff";
      uiCtx.fillRect(40, revY + 30, w * 0.52, 50);
      // Redraw revenue number
      uiCtx.textAlign = "left";
      uiCtx.fillStyle = "#151421";
      uiCtx.font = '700 56px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      uiCtx.fillText("₹" + Math.round(state.revenue).toLocaleString("en-IN"), 46, revY + 62);

      // --- Dynamic region 3: Sparkline bars ---
      const sbX = w * 0.56, sbW = w * 0.37, baseY = revY + 68, maxBarH = 58;
      // Clear sparkline region
      uiCtx.fillStyle = "#ffffff";
      uiCtx.fillRect(sbX - 6, baseY - maxBarH - 4, sbW + 12, maxBarH + 10);
      for (let i = 0; i < seededBars.length; i++) {
        const bh = seededBars[i] * maxBarH * (0.85 + 0.15 * Math.sin(state.time * 1.4 + i));
        const bx2 = sbX + i * (sbW / seededBars.length);
        if (i < 5) {
          circleIcon(uiCtx, bx2, baseY - 2, 2.6, "rgba(55,201,138,0.55)");
        } else {
          uiCtx.fillStyle = "#37c98a";
          rr(uiCtx, bx2 - 4, baseY - bh, 8, bh, 3);
          uiCtx.fill();
        }
      }

      uiTexture.needsUpdate = true;
    }

    // ---------------------------------------------------------------
    // RESIZE HANDLING
    // ---------------------------------------------------------------
    function handleResize() {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // ---------------------------------------------------------------
    // SCROLL KEYFRAME ANIMATION & LINEAR SPEED GRAPH SETUP
    // ---------------------------------------------------------------
    const parentSection = container.closest("section") || container;

    const scrollTrigger = ScrollTrigger.create({
      trigger: parentSection,
      start: "top 95%",
      end: "bottom 5%",
      scrub: false,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    // ---------------------------------------------------------------
    // ANIMATION & RENDER LOOP WITH SEAMLESS DAMPING
    // ---------------------------------------------------------------
    const clock = new THREE.Clock();
    let elapsed = 0;
    let animId: number;
    let isVisible = true;
    let smoothProgress = 0;

    // UI Texture Throttle State (optimized: coarser rounding + 150ms interval)
    let lastDrawnRevenue = -1;
    let lastDrawnProtected = false;
    let lastUiUpdate = 0;

    function renderUIThrottled(revenueVal: number, isProtected: boolean, timeVal: number) {
      const rounded = Math.round(revenueVal / 1000) * 1000;
      const dtUi = timeVal - lastUiUpdate;
      if (rounded !== lastDrawnRevenue || isProtected !== lastDrawnProtected || dtUi > 0.15) {
        lastDrawnRevenue = rounded;
        lastDrawnProtected = isProtected;
        lastUiUpdate = timeVal;
        drawDynamicUI({ revenue: rounded, protectedOn: isProtected, time: timeVal });
      }
    }

    // Camera Keyframe Vectors
    const CAM_WIDE = new THREE.Vector3(0, 0.1, 13.2);
    const CAM_CLOSE = new THREE.Vector3(0.55, -0.55, 6.1);
    const LOOK_WIDE = new THREE.Vector3(0, 0, 0);
    const LOOK_CLOSE = new THREE.Vector3(0.35, 0.55, 0);

    const camPos = new THREE.Vector3();
    const lookAt = new THREE.Vector3();

    // Fix 1: Idle-aware render loop — drops to ~10fps when not scrolling
    let idleFrameCount = 0;
    let frameSkipCounter = 0;
    const IDLE_THRESHOLD = 0.001;  // scroll velocity threshold
    const IDLE_FRAMES_NEEDED = 10; // consecutive idle frames before throttling
    const IDLE_SKIP = 5;           // render every 6th frame when idle (~10fps)

    function tick() {
      animId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.05);

      // Sub-frame smooth lerp filter (Lenis already smooths input)
      const targetP = scrollProgressRef.current;
      const scrollDelta = Math.abs(targetP - smoothProgress);
      smoothProgress += (targetP - smoothProgress) * Math.min(1, dt * 20);

      // Idle detection: skip frames when scroll velocity is near-zero
      if (scrollDelta < IDLE_THRESHOLD) {
        idleFrameCount = Math.min(idleFrameCount + 1, IDLE_FRAMES_NEEDED + 1);
      } else {
        idleFrameCount = 0;
      }

      if (idleFrameCount > IDLE_FRAMES_NEEDED) {
        frameSkipCounter++;
        if (frameSkipCounter % (IDLE_SKIP + 1) !== 0) return; // skip this frame
      } else {
        frameSkipCounter = 0;
      }

      elapsed += dt;
      const p = smoothProgress;

      // Accelerated curve: starts immediately with high speed, reaches 100% completion by 25% (0.25) of scroll
      let mix = 0;
      let pop = 0;
      let revenueProgress = 0;

      if (p <= 0.25) {
        const k = Math.min(1.0, Math.max(0.0, p / 0.25));
        mix = k;
        pop = k;
        revenueProgress = k;
      } else if (p < 0.85) {
        mix = 1;
        pop = 1;
        revenueProgress = 1;
      } else {
        const k2 = Math.min(1.0, Math.max(0.0, (p - 0.85) / 0.15));
        mix = 1 - k2;
        pop = 1 - k2;
        revenueProgress = 1 - k2;
      }

      // Camera Positioning — breathing only when actively scrolling to save GPU when idle
      camPos.lerpVectors(CAM_WIDE, CAM_CLOSE, mix);
      if (idleFrameCount <= IDLE_FRAMES_NEEDED) {
        // Only animate breathing when actively scrolling
        camPos.x += Math.sin(elapsed * 0.28) * 0.08;
        camPos.y += Math.cos(elapsed * 0.23) * 0.05;
      }
      camera.position.copy(camPos);

      lookAt.lerpVectors(LOOK_WIDE, LOOK_CLOSE, mix);
      camera.lookAt(lookAt);

      // Card 3D Transformation
      cardMesh.position.z = THREE.MathUtils.lerp(CARD_FLAT_Z, CARD_POP_Z, pop);
      const s = THREE.MathUtils.lerp(1.0, 1.08, pop);
      cardMesh.scale.set(s, s, THREE.MathUtils.lerp(1.0, 2.6, pop));
      cardMat.uniforms.uPop.value = pop;
      cardMat.uniforms.uTime.value = elapsed;

      // Revenue Counter
      const revenue = THREE.MathUtils.lerp(180800, 472500, revenueProgress);

      // Sweep Light — only animate when actively scrolling
      if (idleFrameCount <= IDLE_FRAMES_NEEDED) {
        const sweepPos = THREE.MathUtils.lerp(-5.5, 5.5, (elapsed * 0.24) % 1.0);
        for (let i = 0; i < sweepUniformTargets.length; i++) {
          sweepUniformTargets[i].uniforms.sweepPos.value = sweepPos;
        }
      }

      // 2D Texture Update (throttled)
      renderUIThrottled(revenue, pop > 0.45, elapsed);

      renderer.render(scene, camera);
    }

    // Optimization: Pause rendering when offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    tick();

    // ---------------------------------------------------------------
    // CLEANUP
    // ---------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId);
      scrollTrigger.kill();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose Geometries & Materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
      uiTexture.dispose();
      cardTextTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 45%, rgba(246, 240, 252, 0.75) 0%, rgba(248, 248, 246, 0.95) 75%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-80" style={{ willChange: 'transform' }} />
      {/* Fix 5: Vignette promoted to own GPU layer to prevent repainting canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(248, 248, 246, 0) 45%, rgba(248, 248, 246, 0.6) 80%, rgba(248, 248, 246, 0.98) 100%)",
          willChange: 'transform',
        }}
      />
    </div>
  );
}
