export function getSoundAsset(relativePath, name, loop, autoplay, onEnd) {
  return new Howl(
    {
      src: ["assets/sounds/" + relativePath + "/" + name],
      autoplay: autoplay,
      loop: loop,
      onend: onEnd
    }
  );
}

export const preDefinedSounds = {
  entryOfGladiatorsEntry : getSoundAsset(".", "entry1.wav", false, false, null),
  entryOfGladiatorLooped: getSoundAsset(".", "entry2.wav", true, false, null)

}
