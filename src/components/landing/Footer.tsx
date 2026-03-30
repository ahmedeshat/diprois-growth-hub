const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Mobile App", "Security"],
  Solutions: ["Fine Dining", "Quick Service", "Chains & Franchises", "Cafés & Bars"],
  Resources: ["Blog", "Case Studies", "Help Center", "API Docs", "Community"],
  Company: ["About", "Careers", "Contact", "Privacy Policy", "Terms"],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-black tracking-tight">Diprois</span>
            <p className="text-primary-foreground/60 text-sm mt-3 leading-relaxed">
              Hybrid intelligent services for profitable restaurant growth.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">© 2026 Diprois. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
