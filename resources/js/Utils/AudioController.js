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
        const signal = this.abortController.signal;

        try {
            const response = await fetch(route('narrate'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ text }),
                signal: signal
            });

            // DEBUG: If server fails, read the JSON error message
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Narrator Error:", errorData);
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            if (!signal.aborted) {
                this.currentAudio = new Audio(url);
                this.currentAudio.play();
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("Narrator Fetch Exception:", err);
            }
        }
    }
}

export const narrator = new AudioController();