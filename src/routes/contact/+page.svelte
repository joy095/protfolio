<script lang="ts">
	import { fly } from 'svelte/transition';

	interface FormData {
		name: string;
		email: string;
		message: string;
		subject: string;
		phone?: string;
	}

	let formData: FormData = {
		name: '',
		email: '',
		message: '',
		subject: '',
		phone: ''
	};

	let showContact = false;
	let isEmailValid = false;
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		isEmailValid = emailRegex.test(email);
		return isEmailValid;
	};

	let isPhoneValid = false;

	const validatePhone = (phone: string): boolean => {
		const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
		isPhoneValid = phoneRegex.test(phone);
		return isPhoneValid;
	};

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		if (!validateEmail(formData.email)) return;

		try {
			isSubmitting = true;
			const response = await fetch('https://nodemailer-bay.vercel.app/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			submitStatus = 'success';
			formData = { name: '', email: '', subject: '', message: '' };
		} catch (error) {
			console.error('Submission error:', error);
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	};

	setTimeout(() => {
		showContact = true;
	}, 1000);
</script>

<head>
	<title> Joy Karmakar - Contact Me </title>
	<meta
		name="description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta name="author" content="Joy Karmakar" />
	<meta property="og:title" content="Joy Karmakar - Contact Me" />
	<meta
		property="og:description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta property="og:image" content="https://joykarmakar.vercel.app/contact.webp" />
	<meta property="og:url" content="https://joykarmakar.vercel.app/contact" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="https://joykarmakar.vercel.app/contact.webp" />
	<meta name="twitter:title" content="Joy Karmakar - Contact Me" />
	<meta
		name="twitter:description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta name="twitter:image" content="https://joykarmakar.vercel.app/contact.webp" />
</head>

{#if showContact}
	<div class="container-auto">
		<h1
			class="mt-40 font-semibold text-[5rem] md:text-[6.875rem] tracking-tighter leading-tight"
			in:fly={{ duration: 800, y: 50 }}
		>
			Contact
		</h1>

		<div class="border-t border-black">
			<div class="flex mt-20">
				<div class="md:w-[30%]"></div>
				<div class="md:w-[70%]">
					<p class="text-xl md:text-3xl leading-[1.5] font-medium">
						I'm looking forward to hearing from you! If you prefer not to fill out forms, feel free
						to email me directly and let's talk about the next big thing!
					</p>

					<a
						class="text-xl font-medium button overflow-hidden flex items-center pb-2 gap-2 mt-5 w-fit nav-links"
						href="mailto:joykarmakar987654321@gmail.com"
						>joykarmakar987654321@gmail.com

						<div class="h-4 w-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
								/>
							</svg>
						</div>
					</a>

					<form on:submit={handleSubmit} class="mt-10 mb-32 bg-[#e5e1dc] p-5 md:p-8">
						<div class="flex flex-col gap-2">
							<label class="text-xl font-medium" for="name">Name*</label>
							<input
								class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
								type="text"
								name="name"
								bind:value={formData.name}
								required
								placeholder="Ex. John Doe"
							/>
						</div>

						<div class="flex flex-col gap-2 mt-6">
							<label class="text-xl font-medium" for="name">Subject*</label>
							<input
								class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
								type="text"
								name="subject"
								bind:value={formData.subject}
								required
								placeholder="Subject"
							/>
						</div>

						<div class="flex flex-col gap-2 mt-6">
							<label class="text-xl font-medium" for="email">Email*</label>
							<input
								class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
								type="text"
								name="email"
								bind:value={formData.email}
								on:input={(e) => validateEmail(e.currentTarget.value)}
								class:invalid={!isEmailValid && formData.email}
								required
								placeholder="hello.website.com"
							/>
							{#if !isEmailValid && formData.email}
								<p class="text-red-500 text-sm mt-1">Please enter a valid email address</p>
							{/if}
						</div>

						<div class="flex flex-col gap-2 mt-6">
							<label class="text-xl font-medium" for="name">Phone</label>
							<input
								class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
								type="tel"
								name="phone"
								bind:value={formData.phone}
								on:input={(e) => validatePhone(e.currentTarget.value)}
								class:invalid={!isPhoneValid && formData.phone}
								placeholder="+91 1234567890"
							/>
							{#if !isPhoneValid && formData.phone}
								<p class="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
							{/if}
						</div>

						<div class="flex flex-col gap-2 mt-6">
							<label class="text-xl font-medium" for="message">Message*</label>
							<textarea
								class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
								name="message"
								bind:value={formData.message}
								required
								placeholder="Share Message"
								rows="5"
							></textarea>
						</div>

						<button
							disabled={!isEmailValid || isSubmitting}
							class="nav-links mt-6 px-7 py-3 bg-[#151515] text-[#f1efed]"
						>
							{#if isSubmitting}
								Sending...
							{:else}
								Submit
							{/if}
						</button>

						{#if submitStatus === 'success'}
							<p class="text-green-500 mt-2">Message sent successfully!</p>
						{:else if submitStatus === 'error'}
							<p class="text-red-500 mt-2">Failed to send message. Please try again.</p>
						{/if}
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.invalid {
		border: 2px solid red;
	}

	button:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}

	/* Button hover animation styles */
	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.button:hover div {
		rotate: 45deg;
		transition: rotate 0.4s ease;
	}
	.button:not(:hover) div {
		rotate: 0deg;
		transition: rotate 0.4s ease;
	}

	.button::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: -100%;
		height: 2px;
		width: 100%;
		background-color: #151515;
		transition: left 0.4s ease;
	}

	.button:hover::before {
		animation: slideIn 0.4s ease forwards;
	}

	.button:not(:hover)::before {
		animation: slideOut 0.4s ease forwards;
	}

	@keyframes slideIn {
		0% {
			left: -100%;
		}
		100% {
			left: 0%;
		}
	}

	@keyframes slideOut {
		0% {
			left: 0%;
		}
		100% {
			left: 100%;
		}
	}
</style>
