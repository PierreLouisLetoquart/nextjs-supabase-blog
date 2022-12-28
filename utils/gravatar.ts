export function getAvatarUrl(username: string) {
    // List of styles
    const styles = ['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral', 'big-smile', 'bottts', 'croodles', 'croodles-neutral', 'identicon', 'initials', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 'pixel-art-neutral'];

    // Get a random style from the list
    const style = styles[Math.floor(Math.random() * styles.length)];

    // Construct the URL with the random style and the given username
    const url = `https://avatars.dicebear.com/api/${style}/${username}.svg`.toString();

    return url;
}