import NavMenu from "./_Components/navmenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <NavMenu />

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
