# EAden

A self-hosted clone of [Gather](https://gather.town) — a virtual 2D world where
people move avatars around a map and fall into proximity-based audio/video calls
with whoever is near them.

## Goal

Build a self-hostable Gather-style virtual office / event space:

- 2D tile-based map with movable avatars
- Real-time multiplayer presence (who is where, moving)
- **Proximity-based** audio/video — you hear/see people near your avatar, calls
  fade as you walk away
- Private spaces / rooms, spawn points, interactive objects
- Self-hosted: runs on your own server, no third-party SaaS dependency

## Status

Just scaffolded (2026-06-21). No stack chosen yet — this README is the only file.

## Decisions to make

- [ ] Frontend / rendering: HTML5 canvas vs. a game engine (Phaser, PixiJS)
- [ ] Realtime transport: WebSocket server (positions/presence)
- [ ] Media: WebRTC for A/V; mesh (small rooms) vs. SFU (mediasoup / LiveKit) for scale
- [ ] Backend language/runtime + persistence (maps, rooms, accounts)
- [ ] Deployment story (Docker compose for the self-host target)
