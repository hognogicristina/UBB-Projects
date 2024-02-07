export function shufleArray<T>(arr: T[]) {
    let currentIndex = arr.length;
    while(currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]
        ];
    }
    return arr;
}