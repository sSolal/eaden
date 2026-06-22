<script lang="ts">
    import { fly } from "svelte/transition";
    import { isMobileOnboarding } from "../../../Stores/OnboardingStore";

    interface Props {
        title: string;
        description: string;
        next: string;
        onnext?: () => void;
    }

    const { title, description, next, onnext }: Props = $props();

    function handleNext() {
        onnext?.();
    }
</script>

<div
    class="z-[3001] pointer-events-auto {$isMobileOnboarding
        ? 'fixed left-4 right-4 bottom-4'
        : 'fixed top-1/2 -right-10 transform -translate-x-14 -translate-y-1/2'}"
>
    <div
        class="bg-contrast/90 backdrop-blur-lg rounded-xl p-4 sm:p-6 w-full max-w-lg shadow-2xl border border-white/20 {$isMobileOnboarding
            ? 'mx-auto max-h-[70vh] overflow-y-auto'
            : ''}"
        in:fly={{ y: $isMobileOnboarding ? -10 : 10, duration: 400 }}
    >
        <div class="space-y-4">
            <h3 class="text-lg sm:text-xl font-bold text-white">
                {title}
            </h3>
            <p class="text-sm text-white/90 leading-relaxed">
                {description}
            </p>
            <button
                class="mt-4 px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg font-semibold transition-all"
                onclick={handleNext}
            >
                {next}
            </button>
        </div>
    </div>
</div>
