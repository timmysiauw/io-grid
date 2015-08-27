# io-grid

Efficient in-polygon point generator for points in a grid.

## Description

Checks and returns points on a grid that are inside a given polygon. This library is *much* more efficient than naively checking each point individually because it takes advantage of the fact that the points in question are structured into a grid. Specifically, it abuses the [ray casting algorithm](https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm) and the fact that every row of points in a grid lies on one of these rays. So every point in a row can be checked at once. Also, knowing that the row is strictly horizontal simplies the intersection calculations, which happen *a lot*. 

An actual time testing is pending, but most of the time spent computing the points is probably in generating the data structures that store the point coordinates rather than the in-out test itself.

## Usage

Create a 200x100 grid object with an increment size of 1 where the upper left-hand corner is at (0,0).

`var grid = new Grid({x0: 0, xf:200, dx: 1, y0: 0, yf: 100, dy: 1});`

Get the points that are inside a 50x50 square where the upper left-hand corner is at (20,20).

`var points = grid.pointsInPoly([{x: 20, y: 20},{x: 70, y: 20},{x: 70, y: 70},{x: 20, y: 70}]);`

## Demo

Try out the [demo](http://timmysiauw.github.io/io-grid/) using [paper.js](http://paperjs.org/).