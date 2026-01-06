
# Quick Form Builder – Open Source Drag & Drop Form Builder

Quick Form Builder is a **modern open-source drag-and-drop form builder** built with **Next.js, TypeScript, Prisma, and PostgreSQL**.

Create, customize, and publish forms in minutes — **no code required**.  
Perfect for developers, startups, and teams who want a fast, flexible alternative to traditional form tools.

![Quick Form Builder Landing Page](/public/og-image.png)

## 🔥 Why Quick Form Builder?

- ⚡ Build forms faster with drag & drop
- 🎨 Light & dark theme support
- 🔐 Secure authentication (Clerk)
- 📊 Dashboard to manage forms & submissions
- 🗃️ PostgreSQL + Prisma ORM
- 🧩 Modern, responsive UI
- 🌍 Open source & developer-friendly

---

## 🌐 Live Demo

👉 **Try it live:**  
https://quick-form-one.vercel.app

---

## 🖼️ Screenshots

### Dashboard (Light Theme)
![Dashboard Light](/public/dashboard-light.png)

### Create Form
![Create Form](preview_create_form.png)

### Form Submissions
![Form Submissions](/public/form-light.png)

---

## 🧠 Features

### 🧱 Drag & Drop Form Builder
- Add text inputs, selects, checkboxes, and more
- Reorder fields visually
- Configure labels, placeholders, and required states

### 🎨 Theme Toggle
- Built-in light & dark mode
- Smooth theme switching

### 👤 Authentication
- Secure login/signup using Clerk
- User-specific dashboards

### 📊 Dashboard
- Manage all forms in one place
- Track submissions per form

### 📥 Submission Management
- View responses in a clean, readable format
- Designed for clarity and speed

### 🗄️ Database & Backend
- Prisma ORM for type safety
- PostgreSQL for reliability and scale

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide
- **Auth:** Clerk
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Deployment:** Vercel

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Devsethi3/Quick-Form-Builder.git
cd Quick-Form-Builder
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quickform"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 4️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5️⃣ Start the dev server

```bash
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Lint codebase
```

---

## 🧩 Roadmap

* [ ] More field types
* [ ] Advanced validation rules
* [ ] Shareable public form links
* [ ] Export submissions (CSV)
* [ ] Webhooks & integrations
* [ ] Team collaboration

---

## 🤝 Contributing

We welcome contributions of all kinds!

Please read **CONTRIBUTING.md** before submitting a pull request.

---

## 📜 License

MIT License © 2026
Free to use, modify, and distribute.

---

## ⭐ Support the Project

If this project helped you:

* ⭐ Star the repo
* 🐛 Report bugs
* 💡 Suggest features
* 🔁 Share it with others

---

## 👋 Author

Built by **Dev Sethi**

* GitHub: [https://github.com/Devsethi3](https://github.com/Devsethi3)
* Twitter/X: [https://twitter.com/devsethi3](https://twitter.com/devsethi3)

Happy building 🚀
