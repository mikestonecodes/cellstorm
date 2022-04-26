#version 300 es
precision highp float;
precision highp sampler2DArray;
uniform float uTime;
uniform int numQuads;
uniform highp int width;
uniform highp int height;
flat out int vid;
flat out float rotation;
out vec2 vemu_PointCoord;

float hash(float p) {
  vec2 p2 = fract(vec2(p * 5.3983, p * 5.4427));
  p2 += dot(p2.yx, p2.xy + vec2(21.5351, 14.3137));
  return fract(p2.x * p2.y * 95.4337);
}
vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {

  int qID =gl_InstanceID;
  float u = float(qID) / float(numQuads);
  vid = qID;
  float size =  5. +(sin(uTime  ) * 10.0);
    float off = floor(uTime + u) / 1000.0;            // changes once per second per vertex

  float x = hash(u + off) * 2.0 - 1.0;             // random position
  float y = fract(uTime + u) * -2.0 + 1.0;      // 1.0 ->  -1.0
  rotation = uTime;
  ivec2 unitQuad = ivec2(
      gl_VertexID / 6 + gl_VertexID % 2,
      (gl_VertexID / 2 + gl_VertexID / 3) % 2);

  gl_Position = vec4(   vec2(x,y)  , u,  1.);
   

 
    gl_Position.xy += (vec2(unitQuad) - 0.5) * 2.0 * size / vec2(width,height);
    vec2 rot = rotateUV(gl_Position.xy, rotation,vec2(x,y));
     gl_Position.xy = rot;
   

    vemu_PointCoord = vec2(unitQuad.x, 1.0 - float(unitQuad.y));
    gl_PointSize = size/4.;

}