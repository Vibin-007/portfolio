# Character model (hero 3D scene)

This folder is where the **optional, rigged character GLB** is served from.

## Default behaviour

If no model is configured, the hero renders a fully three-dimensional,
procedurally-built stand-in figure (`src/scenes/FallbackCharacter.tsx`) that is
lit, shadowed and animated (looping tie-adjust gesture, breathing, weight
shift). It is a real mesh — never a flat image — so the 3D scene, camera
choreography and loading/error states all work out of the box.

## Enabling a rigged model

1. Add a licensed, rigged `.glb`/`.gltf` file here, e.g. `character.glb`.
2. Create a `.env` file in the project root (copy `.env.example`) and set:

   ```
   VITE_CHARACTER_MODEL=/models/character.glb
   VITE_CHARACTER_ROTATION=180   # optional, degrees, if the model faces away
   ```

3. Restart the dev server. The scene will now:
   - load asynchronously with `useGLTF` inside `<Suspense>`
   - normalise the model height to ~1.8 units and place its feet at y = 0
   - prefer a clip whose name matches `/tie|adjust|suit|idle|loop/i`, then the
     first available clip, looping it continuously
   - fall back to the procedural figure automatically on any load/render error

## Recommended sources (verify the licence before shipping)

- **Ready Player Me** avatars (commercial-friendly, rigged, Mixamo-compatible)
- **Mixamo** (free characters + animation clips; check Adobe's terms)
- Any asset you have an explicit licence for.

Do **not** commit a model you do not have the rights to redistribute.

## Replacing copy

The hero figure is purely visual. **No essential text lives inside WebGL** — all
copy is normal DOM and remains readable if WebGL is unavailable.
