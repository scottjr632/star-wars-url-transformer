
export default function () {
  this.addEventListener('message', ({ data }) => {

    if (!data) return;

    postMessage(data);
  });
}