export function throttle(func: Function, ms: number) {

  let isThrottled: boolean = false
  let savedArgs: any;
  let savedThis: any;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      // @ts-ignore
      savedThis = this;
      return;
    }
    // @ts-ignore
    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}