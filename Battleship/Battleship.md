## Battleship Game

Constraints for placing ships in the game battleship.

submarine (s) - 1
destroyer (d) - 2
patrol boat (p) - 3


`grid - G[n][n]`

### Inputs - (x, y) coordinates of the ship
`s[3][2]`
`d[3][2]`
`p[2][2]`


**Range Constrain**
`0 <= s[i][i] <= n`
`0 <= d[i][i] <= n`
`0 <= p[i][i] <= n`

**Length Constrain**
- check p1-p2 = 1 | (length of p = 1)
- check d1-d2 = 1 | d2-d3 = 1 | d1-d3 = 2 | (length of d = 2 ) | hypotenuse = 0
- check s1-s2 = 1 | s2-s3 = 1 | s1-s3 = 2 | (length of s = 2 ) | hypotenuse = 0

**Coordinate Constrain**
- Check for overlapping coordinates