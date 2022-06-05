export async function getServerSideProps(context: any) {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
}
export default function Index() {
  return <div>index</div>;
}
