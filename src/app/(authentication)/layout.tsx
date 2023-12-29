export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <meta name="google-signin-client_id" content="664031912046-qmhid58i7t0ul4kcptpr05nihs354h8t.apps.googleusercontent.com" /> 
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400">
          <div className="bg-white p-10 rounded-md rounded-tl-[2px] rounded-tr-[32px] rounded-bl-[32px] rounded-br-[32px]">
            {children}
          </div>
        </div>
      </section>
    )
  }