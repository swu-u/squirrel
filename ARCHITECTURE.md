# Squirrel game: shared brief for everyone building a module

A 3D third-person action and parkour game that runs as a web page, **phone first** (touch, landscape and portrait).
You are a squirrel in an autumn city park: you climb real 3D trees branch by branch, leap tree to tree, run along
power lines, cross rooftops, collect acorns and fight off dogs. Quality bar: it must look and feel like a polished
stylised indie game (think warm golden-hour light, rich foliage, smooth rounded shapes, lots of secondary motion),
**never** like a blocky low-poly prototype.

The soul of the game is the squirrel's rhythm: it goes, it stops dead, it is alert and looks around with quick head
snaps, then boom boom boom it sprints. Fidgety, fast and slow.

## Hard rules
- three.js r170 from npm (`import * as THREE from 'three'`, addons from `three/addons/...`). Plain JavaScript ES modules. No other dependencies.
- No external assets and no network requests. Every texture is generated in code (canvas or shader). Every sound is synthesised.
- Units are metres, Y is up. The squirrel body is 0.5 m nose to rump (game scale), its tail another 0.5 m.
- Only edit the files listed as yours. Do not edit `src/core/world.js`, `src/world/env.js`, `ARCHITECTURE.md`, `package.json`. Do not run git commands.
- A vite dev server is already running at http://localhost:5173 (serving this folder). Do not start another one, do not kill it.
- UI copy: plain words. Never use italic anywhere (no `font-style: italic`, no `<i>`, no `<em>`).
- Deterministic generation: use `mulberry32(seed)` from `src/core/rng.js`, never `Math.random()` for world layout.
- Performance target is a mid-range phone at 60 fps. Whole game budget: about 1.2 million triangles on screen, under 250 draw calls.
  Merge static geometry, use InstancedMesh, share materials. No per-frame allocations in update loops (reuse vectors).

## How to check your own work (required)
Make a standalone viewer page `dev/<yourmodule>.html` (see `dev/env.html` for the pattern) that shows only your module under
the real lighting (`setupEnvironment` from `src/world/env.js`). Then take screenshots and LOOK at them:

    node tools/shot.mjs "http://localhost:5173/dev/yourmodule.html?any=params" shots/yourmodule-1.png --wait 2500
    # optional: --w 844 --h 390 (default, phone landscape)  --eval "window.debug.something()"  --evalwait 800

then open the png with the Read tool. Drive your viewer with query params or a `window.debug` object so you can capture
different poses, angles and moments. Iterate at least 5 or 6 rounds: be a harsh art director, fix what looks cheap,
stiff, flat or wrong. The script prints page errors; there must be none. Name your screenshots `shots/<yourmodule>-*.png`.

## Shared look (src/world/env.js)
`setupEnvironment(scene, renderer, opts)` gives a low warm sun (DirectionalLight with shadows that follow a focus point),
a hemisphere light, exponential fog (`scene.fog`), ACES tone mapping and an environment map. `PALETTE` has the shared colours,
`SUN_DIR` is the direction to the sun. Use `MeshStandardMaterial` / `MeshPhysicalMaterial`, or a `ShaderMaterial` that
supports fog and reacts to the sun. Set `castShadow` / `receiveShadow` sensibly. The final game adds bloom and colour grading.

## Collision world (src/core/world.js), already written
Everything climbable or walkable is a primitive in `World`:
- `world.addCapsule(a, b, ra, rb, { kind })`: tapered capsule from point a to b. kinds: 'trunk', 'branch', 'pole', 'wire', 'rail', 'pipe'...
- `world.addBox(center, halfExtents, rot, { kind })`: oriented box. rot = yaw number, Euler or Quaternion. kinds: 'building', 'roof', 'prop', 'car', 'fence', 'awning'...
- `world.setGroundHeightFn((x, z) => y)`, `world.groundHeight(x, z)`
- `world.nearest(p, maxDist, out, filter)`, `world.raycast(origin, dir, maxDist)`, `world.queryPrims(x, z, radius, cb)`
- `world.bounds` = playable rectangle, default x and z from -120 to 120.

The squirrel sticks to the nearest surface and can walk on ANY primitive in any orientation: up trunks, along branches and
wires, up walls, over roof edges. It leaps between primitives with assisted jumps of up to about 7 m horizontally and 3 m up.
So collision shapes must match the visuals closely (within a few centimetres), and should be simple: one box per wall block,
one tilted box per roof slope, one capsule per straight piece of branch, pole or wire.

## Module interfaces

### src/player/squirrelModel.js
    createSquirrel(opts) -> { group, update(dt, s), trigger(name, data), getHeadWorldPosition(out) }
Local frame of `group`: origin = the point on the surface between the feet, +Y = surface normal, +Z = facing direction.
The game positions and orients `group`; the model animates everything inside it procedurally.
    s = {
      mode: 'surface' | 'air',
      speed,      // m/s along the surface, 0..12 (run is about 8, burst sprint 12, climbing about 5.5)
      steep,      // 0 = flat ground .. 1 = vertical surface
      climb,      // -1 heading straight down a wall (head first), 0 level, +1 heading straight up
      thin,       // 0..1, 1 = balancing on a thin wire or twig (feet in one line, tail works for balance)
      turn,       // yaw rate rad/s, signed (body and tail bend into turns)
      airForward, airUp, // velocity in the local frame while airborne, m/s
      airTime,    // seconds since take-off
      alert,      // 0 = relaxed or moving .. 1 = frozen and scanning
      lookLocal,  // THREE.Vector3 or null: a point in local space to look at
      time,       // seconds
    }
    trigger: 'jump', 'land' {impact 0..1}, 'attack', 'throw', 'hurt', 'pickup', 'burst', 'chatter'

### src/world/trees.js
    createTrees(world, specs, opts) -> { group, update(dt, time, camera, focus), trees }
    spec = { x, z, y (ground height, default 0), type: 'oak' | 'maple' | 'birch' | 'pine' | 'street', seed, scale (default 1) }
    trees[i] = { spec, height, crownRadius, perches: Vector3[] (points ON TOP of sturdy branches, for placing acorns), top: Vector3 }
Registers a capsule in `world` for every trunk and branch piece with radius >= 0.045 m.

### src/world/city.js
    createCity(world, opts) -> { group, update(dt, time, camera, focus), layout }
    layout = { spawn: Vector3, home: Vector3 (the nest tree), trees (from createTrees),
               pickupSpots: [{ pos: Vector3, kind: 'acorn' | 'golden', where: 'roof' | 'wire' | 'ground' | 'tree' | 'special', name? }],
               dogZones: [{ center: Vector3, radius, kind: 'terrier' | 'shepherd' | 'bulldog', name? }],
               landmarks: { [name]: Vector3 } }
Sets the ground height function and world.bounds. Calls createTrees itself.

### src/entities/dogs.js
    createDogs(scene, world, zones, opts) -> { list, update(dt, ctx), }
    ctx = { time, player: { position: Vector3, velocity: Vector3, heightAboveGround, hidden: boolean, invulnerable: boolean },
            onEvent(type, dog, data) }   // 'bark', 'growl', 'lunge', 'bite' {damage, dir}, 'yelp', 'flee', 'notice'
    dog = { position: Vector3, radius, height, alive, state, kind, hit(damage, dirVector3, kind: 'pounce' | 'nut' | 'scratch') }

### src/core/input.js and src/ui/hud.js, src/ui/ui.css
    createInput(element) -> { move: {x, y}, consumeLook() -> {dx, dy}, jumpPressed, jumpHeld, attackPressed, pausePressed, isTouch, endFrame(), setEnabled(b) }
    createHUD(root, input) -> see the UI brief

### src/audio/audio.js
    createAudio() -> { unlock(), setVolume(v), play(name, opts), update(dt, state) }
