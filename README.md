# eko-exercise
Graph-traversing exercises for Eko

## Pre-requisites

- Node 10 on Linux


## Running

Since this is a purely algorithmic exercise, just run
```sh
    npm i
    npm t
```
The tests will run that execute the exercise's cases as specified.

## Notes

One test case fails, namely, finding E -> D routes with 4 stops max.
I believe this is because I don't allow backtracking in traversing the graph.
Changing it would require a bit of remodel in `stepsFrom` function: it would need to store edges not nodes. It would quite certainly also protect against oscillation without extra checks.
