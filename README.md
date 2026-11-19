# Squirrel

A 3D parkour game that runs in the browser, built for phones first. You are a squirrel in an autumn town:
climb real branching trees, leap from bough to bough, run the power lines to the rooftops, gather acorns,
find the 12 golden acorns and see off the dogs.

## Play

    npm install
    npm run dev        # then open the printed address (the Network one works from a phone on the same Wi-Fi)

Production build: `npm run build`, then `npm run preview`.

## Controls

| | Phone | Keyboard |
|---|---|---|
| Move | left thumb stick | W A S D or arrows |
| Look | drag anywhere else | drag the mouse (or click to lock it) |
| Jump | Jump button: leaps to the glowing ring. Hold it to keep leaping | Space |
| Attack | Attack button: throws a nut, scratches up close | F or J |
| Pause | pause button | Escape or P |

- Run straight at a trunk, pole or wall to climb it.
- Stand still: the squirrel sits up, looks around, nearby acorns light up and the ring fills. Move again for a sprint burst.
- Push the stick toward a nearby branch or wire and the squirrel hops across by itself.
- Drop onto a dog from above to stun it.

## How it is built

Everything is generated in code: no image, model or sound files.

- `src/core/world.js`: collision shapes (capsules for limbs, poles and wires, boxes for buildings) in a spatial grid
- `src/player/controller.js`: movement that sticks to any surface, with assisted leaps
- `src/player/squirrelModel.js`: the squirrel and all of its animation
- `src/world/trees.js`, `src/world/city.js`: trees and the town
- `src/entities/dogs.js`, `src/entities/pickups.js`: dogs and acorns
- `src/audio/audio.js`: synthesised sound and music
- `src/ui/hud.js`, `src/core/input.js`: on-screen interface and touch, keyboard, gamepad input
- `tools/shot.mjs`, `tools/play.mjs`: headless screenshots and scripted playtests
