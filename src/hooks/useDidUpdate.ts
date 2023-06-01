import { DependencyList, useEffect, useRef } from 'react';

const useDidUpdate = <F extends () => (() => void) | void>(
  effect: F,
  deps: DependencyList
) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    return effect();
  }, deps);
};

export default useDidUpdate;
