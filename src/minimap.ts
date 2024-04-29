import * as pixi from 'pixi.js'

export type MinimapOptions = {
	// coordinate system
	// pixi container
}

export class Minimap {
	private options: MinimapOptions

	public constructor(options: MinimapOptions) {
		this.options = options
	}

	public async render() {
		// The application will create a renderer using WebGL, if possible,
		// with a fallback to a canvas render. It will also setup the ticker
		// and the root stage PIXI.Container
		const app = new pixi.Application();

		// Wait for the Renderer to be available
		await app.init();

		// The application will create a canvas element for you that you
		// can then insert into the DOM
		document.body.appendChild(app.canvas);

		// load the texture we need
		const texture = await pixi.Assets.load('vite.svg');

		// This creates a texture from a 'bunny.png' image
		const bunny = new pixi.Sprite(texture);

		// Setup the position of the bunny
		bunny.x = app.renderer.width / 2;
		bunny.y = app.renderer.height / 2;

		// Rotate around the center
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 0.5;

		// Add the bunny to the scene we are building
		app.stage.addChild(bunny);

		// Listen for frame updates
		app.ticker.add(() => {
			// each frame we spin the bunny around a bit
			bunny.rotation += 0.01;
		});
	}
}