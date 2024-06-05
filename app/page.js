import { waitingFunction } from "./lib/actions"

const page = async () => {
  let res = await waitingFunction();
  // console.log(res);
  if (res?.length) {
    return (
      <>
        <div className="font-bold text-2xl">{res[0].name}</div>
      </>
    )
  } else {
    return <>Fetch Failed !!!</>
  }
}

export default page