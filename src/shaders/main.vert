#version 300 es

in float uTime;

flat out int vid;
flat out float rotation;

void main() {
  float u = float(gl_VertexID) / 1000.;  // goes from 0 to
  vid = gl_VertexID;
  float size = float(vid)*300. ;
  float x = u*size;             
  float y =u*size;          // 1.0 ->  -1.0
  rotation = u*size;
  gl_Position = vec4(x, y, 0, 1);
  gl_PointSize = size;
}