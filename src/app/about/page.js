export default function About() {
    return (
      <main  className="flex min-h-screen flex-col items-center justify-between p-24">
        About
        {process.env.NEXT_PUBLIC_APP_NAME}
      </main>
    )
  }