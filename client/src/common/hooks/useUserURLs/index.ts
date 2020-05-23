/*
    This web worker setup is completely unnecessary for this but
    I just wanted to test out web workers
*/

import { useState, useEffect, useCallback } from 'react';
import localForage from 'localforage';

import { removeDups } from '../../utils';

import workerFile from './worker.js';
import WebWorker from './workerSetup';

const worker = new WebWorker(workerFile);
const key = 'userurls';

export const useUserURLs = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    localForage.getItem<string[]>(key, (err, values) => {
      if (err) {
        console.error(err);
        return;
      }

      if (values)
        setData(values);

    });
  }, []);

  const appendData = useCallback(({ data }: MessageEvent) => {
    if (data) {
      setData(prevData => removeDups([data, ...prevData]));
    }
  }, []);

  useEffect(() => {
    worker.addEventListener('message', appendData);
    return () => worker.removeEventListener('message', appendData);
  }, [appendData]);

  return data;
};

export const useNewUserURL = () => {
  const postNewURL = useCallback((newURL: string) => {
    localForage.getItem<string[]>(key, (err, value) => {
      if (err) {
        console.error(err);
        return;
      }

      if (value) {
        localForage.setItem(key, removeDups([newURL, ...value]));
      } else {
        localForage.setItem(key, [newURL]);
      }
    });
    worker.postMessage(newURL);
  }, []);

  return postNewURL;
};
