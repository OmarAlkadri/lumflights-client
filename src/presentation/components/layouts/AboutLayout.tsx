// src/presentation/components/layouts/AboutLayout.tsx
"use client"; // تأكد من إضافة هذا التوجيه

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <header>Header صفحة About</header>
            <main>{children}</main>
            <footer>Footer صفحة About</footer>
        </div>
    );
};

export default AboutLayout;