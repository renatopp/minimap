package main

import (
	"fmt"
	"os"

	demoinfocs "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs"
	events "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/events"
)

func main() {
	f, err := os.Open("de_ancient.dem")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	p := demoinfocs.NewParser(f)
	defer p.Close()

	p.RegisterEventHandler(func(e events.FrameDone) {
		for _, player := range p.GameState().Participants().All() {
			fmt.Printf("%.4f;%.4f;%.4f\n", player.PreviousFramePosition.X, player.PreviousFramePosition.Y, player.PreviousFramePosition.Z)
		}
	})

	if err := p.ParseToEnd(); err != nil {
		panic(err)
	}
}
