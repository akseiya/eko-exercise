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
The tests follow the exercise, producing doc output.

## Notes

It seems that the challenge's acceptance criteria are not strict enough for me to construct a working solution without implicit checks, including two different interpretations of the constraints depending which test case am I trying to pass.

If I keep to the requirement of not repeating the same step without checking for visiting the same nodes, _possible routes from E to E_ mean _routes that start in E and end in E no matter what happens meanwhile_ as long as a **step** is not repeated. This means that following E->E routes are valid:
```
E-B-E
E-B-E-A-C-D-E
E-B-E-A-C-F-D-E
E-B-E-A-D-E
E-A-B-E
E-A-C-D-E
E-A-C-D-E-B-E
E-A-C-F-D-E
E-A-C-F-D-E-B-E
E-A-D-E
E-A-D-E-B-E
```
instead of what was probably intended:
```
E-B-E
E-A-B-E
E-A-C-D-E
E-A-C-F-D-E
E-A-D-E
```
However, this implicitly requires that we also check for visited nodes and only allow the route to end at its start - no other revisits.

When actually checking for visited nodes as above, another test case breaks, this time the one which looks for E->D routes with no more than 4 steps. When disallowing the E->B->E cycle, possible E->D routes are
```
E-A-C-D
E-A-C-F-D
E-A-D
```
instead of the probably intended
```
E-B-E-A-C-D
E-B-E-A-C-F-D
E-B-E-A-D
E-A-C-D
E-A-C-F-D
E-A-D
```
where filtering the first two due to being too long would yield the expected 4 routes.

In result, the graph has a constructor option so that Case 2 tests can pass each in its own interpretation of the route constraints.
