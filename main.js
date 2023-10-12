function main() {
    var canvas = document.getElementById("mycanvas");

    /** @type {WebGL2RenderingContext} */
    var gl = canvas.getContext("webgl");

    var vertices = [
        -0.24,
        0.1,
        -0.15,
        0.1,
        -0.10,
        -0.04,     
        -0.30,
        -0.04,
                // A Inside

        -0.35,
        0.2,
        -0.05,
        0.2,
        0.1,
        -0.3,
        -0.05,
        -0.3,
        -0.1,
        -0.16,
        -0.3,
        -0.16,
        -0.35,
        -0.3,
        -0.5,
        -0.3,
                // A Outside

        0.2,
        0.2,
        0.33,
        0.2,
        0.33,
        -0.17,
        0.55,
        -0.17,
        0.55,
        -0.3,
        0.2,
        -0.3,   // L
    ];

    var vertexShaderCode = `
    attribute vec2 aposition;
        void main() {
            gl_Position = vec4(aposition, 0.0, 1.0);
            gl_PointSize = 5.0;
        }
    `;

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aposition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    gl.drawArrays(gl.LINE_LOOP, 4, 8);
    gl.drawArrays(gl.LINE_LOOP, 12, 6);
}
