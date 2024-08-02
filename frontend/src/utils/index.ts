const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 1000) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => fn(...args), delay);
  };
};

const detechMediaType = (mediaURL: string) => {
  const types = new Map([
    ["jpg", "img"],
    ["png", "img"],
    ["gif", "img"],
    ["mp4", "video"],
    ["3gp", "video"],
  ]);

  const url = new URL(mediaURL);
  const extension = url.pathname.split(".")[1];
  return types.get(extension);
};

export { debounce, detechMediaType };
