import axios from 'axios';

class AudioController {
    constructor() {
        this.currentAudio = null;
        this.abortController = null;
    }

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    }

    async play(text) {
        this.stop();
        if (!text || !text.trim()) return;

        console.log("Narrator: Requesting audio for ->", text); // DEBUG LOG

        this.abortController = new AbortController();

        try {
            const response = await axios.post(route('narrate'), { text }, {
                responseType: 'blob',
                signal: this.abortController.signal
            });

            const blob = response.data;
            const url = URL.createObjectURL(blob);

            // Double check if we were aborted while waiting
            if (!this.abortController.signal.aborted) {
                this.currentAudio = new Audio(url);
                this.currentAudio.play();
            }
        } catch (err) {
            if (axios.isCancel(err) || err.name === 'CanceledError') {
                console.log("Narrator: Request canceled.");
            } else {
                console.error("Narrator Error:", err);
                if (err.response && err.response.status === 419) {
                    console.error("CSRF Token Mismatch. Please refresh the page.");
                }
            }
        }
    }
}

export const narrator = new AudioController();