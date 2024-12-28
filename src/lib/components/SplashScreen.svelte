<div class="splash-screen">
	<p class="text-content mt-20">
		<span class="letter">J</span>
		<span class="letter">o</span>
		<span class="letter">y</span>
		<span class="letter space"></span>
		<span class="letter">K</span>
		<span class="letter">a</span>
		<span class="letter">r</span>
		<span class="letter">m</span>
		<span class="letter">a</span>
		<span class="letter">k</span>
		<span class="letter">a</span>
		<span class="letter">r</span>
	</p>
</div>

<style>
	.splash-screen {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgb(12, 12, 12);
		z-index: 99;
		overflow: hidden;
		animation: splashScreen 2s ease-in-out forwards;
	}

	.text-content {
		font-size: 1.5rem;
		font-weight: bold;
		color: rgba(255, 255, 255, 0.8);
		display: flex;
	}

	.letter {
		opacity: 0;
		animation: fadeInOut 1.8s ease-in-out forwards;
	}

	.space {
		width: 0.5rem;
	}

	/* Add delay for each letter */
	.letter:nth-child(1) {
		animation-delay: 0.01s;
	}
	.letter:nth-child(2) {
		animation-delay: 0.03s;
	}
	.letter:nth-child(3) {
		animation-delay: 0.05s;
	}
	.letter:nth-child(4) {
		animation-delay: 0.07s;
	}
	.letter:nth-child(5) {
		animation-delay: 0.09s;
	}
	.letter:nth-child(6) {
		animation-delay: 0.11s;
	}
	.letter:nth-child(7) {
		animation-delay: 0.13s;
	}
	.letter:nth-child(8) {
		animation-delay: 0.15s;
	}
	.letter:nth-child(9) {
		animation-delay: 0.17s;
	}
	.letter:nth-child(10) {
		animation-delay: 0.19s;
	}
	.letter:nth-child(11) {
		animation-delay: 0.21s;
	}
	.letter:nth-child(12) {
		animation-delay: 0.23s;
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		20% {
			opacity: 1;
			transform: translateY(0);
		}
		50% {
			opacity: 1;
			transform: translateY(0);
		}
		85% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes splashScreen {
		90% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}
</style>
