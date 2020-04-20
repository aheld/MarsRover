# MarsRover Kata

Blend TDD and some Domain modeling to help NASA control a fleet of rovers exploring a plateau.

The rovers are simlple bots that can only move forward or turn 90&deg; left or right along the cardinal compass points.

The commands are sent as a single multi-line string.  The first line describes the palteau, and the next lines descibe the start and movement orders for each bot.

for the follwing input
```
5 5
1 1 N
MRML
```
the output should be 
```
2 2 N
```

1. ```5 5```
    - Create a 5x5 space for the rovers to roam in
2. ```1 1 N``` 
    - Rover starts at pos 1,2 facing North
3. ```MRML```
    - Move North => now at ```1 2 N```
    - Turn Right => now at ```1 2 E```
    - Move East => now at ```2 2 E```
    - Turn Left => now at ```2 2 N```

[Full Starting Problem Statment](problem.md)

## Steps (see branches)
1. A single rover that does not move
2. A single rover that can turn (once)
3. A single rover that can move (once)

## Language versions
1. C# https://github.com/aheld/MarsRover/tree/step-1
1. Go https://github.com/aheld/MarsRover/tree/go
1. Javascript https://github.com/aheld/MarsRover/tree/functional_node

