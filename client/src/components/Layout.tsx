import { ReactNode } from "react";
import { PenLine } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PenLine className="text-primary h-6 w-6 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">El Yazısı Pratik Uygulaması</h1>
            </div>
            <a href="#tips" className="text-primary hover:text-primary-600 text-sm font-medium">
              Nasıl Çalışır?
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} El Yazısı Pratik Uygulaması. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
