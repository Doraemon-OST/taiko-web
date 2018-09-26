class Tutorial{
	constructor(fromSongSel){
		this.fromSongSel = fromSongSel
		loader.changePage("tutorial")
		assets.sounds["bgm_setsume"].playLoop(0.1, false, 0, 1.054, 16.054)
		this.endButton = document.getElementById("tutorial-end-button")
		pageEvents.once(this.endButton, "click").then(this.onEnd.bind(this))
		pageEvents.keyOnce(this, 13, "down").then(this.onEnd.bind(this))
		this.gamepad = new Gamepad({
			"confirm": ["start", "b"]
		}, this.onEnd.bind(this))
	}
	onEnd(){
		this.clean()
		assets.sounds["don"].play()
		localStorage.setItem("tutorial", "true")
		setTimeout(() => {
			new SongSelect(this.fromSongSel)
		}, 500)
	}
	clean(){
		this.gamepad.clean()
		assets.sounds["bgm_setsume"].stop()
		pageEvents.remove(this.endButton, "click")
		pageEvents.keyRemove(this, 13)
		delete this.endButton
	}
}