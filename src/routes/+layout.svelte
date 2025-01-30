<script>
  import "$lib/global.css"
	import { language, setLanguage } from "$lib/language"
	import { onMount } from "svelte"

  const { children } = $props()

  let loading = $state(true)

  onMount(async() => {
    try {
      const { AndroidFullScreen } = await import("@awesome-cordova-plugins/android-full-screen")
      AndroidFullScreen.isImmersiveModeSupported().then(() => AndroidFullScreen.immersiveMode())

      const { StatusBar } = await import("@capacitor/status-bar")
      await StatusBar.hide()

      const { ScreenOrientation } = await import("@capacitor/screen-orientation")
      await ScreenOrientation.lock({ orientation: "portrait" })

      const { Device } = await import("@capacitor/device")
      setLanguage((await Device.getLanguageCode()).value)

      const { SplashScreen } = await import("@capacitor/splash-screen")
      await SplashScreen.hide()
    } finally {
      loading = false
    }
  })
</script>

{#key language}
  {#if !loading}
    <main data-sveltekit-preload-code="viewport" lang={language}>
      {@render children()}
    </main>
  {/if}
{/key}

<style>
  main {
    height: 100vh;
    margin: 0 auto;
    padding-top: env(safe-area-inset-top);
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
