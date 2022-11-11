export const drawGridOnCanvas = (canvas: HTMLCanvasElement):void => {
    const ctx = canvas.getContext("2d");
    if(ctx) {
        ctx.strokeStyle = "#4a4a4a";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = i*100;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            
            const y = i*100;
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
}

export const coordinatesToString = (x: number, y:number):string => `${x}|${y}`