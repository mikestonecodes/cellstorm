#version 300 es

uniform float uTime;
uniform int numVerts;

flat out int vid;
flat out float rotation;

float hash(float p) {
  vec2 p2 = fract(vec2(p * 5.3983, p * 5.4427));
  p2 += dot(p2.yx, p2.xy + vec2(21.5351, 14.3137));
  return fract(p2.x * p2.y * 95.4337);
}

void main() {
  float u = float(gl_VertexID) / float(numVerts);
  vid = gl_VertexID;
  float size =  14.+(sin(uTime  ) * 70.0);
    float off = floor(uTime + u) / 1000.0;            // changes once per second per vertex

  float x = hash(u + off) * 2.0 - 1.0;             // random position
  float y = fract(uTime + u) * -2.0 + 1.0;      // 1.0 ->  -1.0
  rotation = uTime;
  gl_Position = vec4(x, y, 0, 1);
  gl_PointSize = size;
}