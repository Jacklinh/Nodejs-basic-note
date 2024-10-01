# Nextjs

## Giới thiệu

- nextjs là 1 framework react dùng để xây dụng ứng dụng web full -stack.
- bạn sử dụng react components để xây dựng giao diện người dùng và next.js có thêm các tính năng và tối ưu hóa.
- nextjs cũng tóm tắt và tự động cấu hình các công cụ cần thiết trong react như bundling(đóng gói), compliling(phiên dịch)... điều này giúp bạn tập trung vào xấy dựng ứng dụng mà k cần dành thời gian cho việc cấu hình

## 1 số tính năng chính của nextjs

- 1. Routing: router dựa trên hệ thống folder tập tin được xây dựng trên `serer components`. nó hỗ trợ layouts, nested routing, loading states, error handling...
- 2. Rendering: hỗ trợ 2 loại rendering chính là Server-side Rendering (SSD) và Static Site Generation (SSG), cùng với Client - side Rendering (CSR).
    + SSR: cho phép bạn render trang trên server trước khi gửi đến client. điều này giúp cải thiện SEO, hiệu suất và khả năng tương tác với nội dung động
    + SSG: cung cấp khả năng tạo trước các trang tĩnh tại thời điểm buid ứng dụng. Giúp giảm thời gian tải trang và cải thiện hiệu suất cho các trang không động.
    + CSR: hỗ trợ render trang trên client-side- là toàn bộ quá trình render xảy ra trên trình duyệt người dùng. thích hợp cho các trang có nội dung động và tương tác cao.
- 3. Data Fetching: tương tác với dữ liệu từ nguồi khác nhau, sử dụng async/await trong Server Component và sử dụng phương thức `fetch` như javascript.
- 4. Styling: hỗ trợ bạn các kiểu style như css modules, tailwind css, css in js.
- 5. Optimizations: nextjs tối ưu hóa image, font and script(tập tin) để tăng cải thiện Core web vitals với trải nghiệm người dùng.
- 6. Typescript: hỗ trợ cho typescript, với khả năng kiểm tra kiểu tốt hơn và biên dịch hiệu quả hơn.

## App router và Page router

- App router: cho phép sử dụng các tính năng mới nhất của react như server component , streaming.
- Page Router: là router next.js gốc, cho phép bạn xây dựng ứng dụng react được kiết xuất trên máy chủ và hỗ trợ cho các úng dụng next.js cũ hơn.

## Using App Router

Doc : <https://nextjs.org/docs/getting-started/installation>

### Cài đặt

- b1. chạy lệnh 
```bash
npx create-next-app@latest my-next-app
yarn create next-app my-next-app
```
- b2. hoàn thành để cài đặt

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

> - trong quá trình tạo dự án, bạn có thể chọn giữa javascript và typescript 
> - Would you like to use App Router? nếu bạn chọn yes thì sẽ sử dụng App Router, con no thì chuyển sang sử dụng Page router

- b3. cài thêm các package cho dụ án

```bash
cd my-next-app
npm install #cài đặt packages với npm
yarn #cài đặt packages với yarn
#sau đó
npm run dev #start server với npm
yarn dev #start server với yarn
```

sau khi thành công thì bạn có thể truy cập vào ứng dụng nextjs của mình bằng cách mỡ trình duyệt và truy câp <http://localhost:3000.>

### cấu trúc dự án

bạn cần tuân thủ theo cách tổ chức project : cấu trúc thư mục, cài đặt tên thư mục, file như next.js đã khuyến nghị
cụ thể xem <https://nextjs.org/docs/getting-started/project-structure>

```text
my-nextjs-app/
├── app/                                # Thư mục bắt buộc
│   ├── layout.tsx                      # Bắt buộc: Cấu trúc layout cho các trang
│   ├── page.tsx                        # Bắt buộc: Trang chính (route gốc)
│   ├── loading.tsx                     # Tùy chọn: Hiển thị khi trang đang tải
│   ├── error.tsx                       # Tùy chọn: Xử lý và hiển thị lỗi
│   ├── global-error.tsx                # Tùy chọn: Global error UI
│   ├── not-found.tsx                   # Tùy chọn: Trang 404
│   ├── route.tsx                       # Tùy chọn: API endpoint
│   ├── template.tsx                    # Tùy chọn: Re-rendered layout
│   ├── default.tsx                     # Tùy chọn: Parallel route fallback page
│   ├── favicon.ico                     # Tùy chọn: Favicon file
│   ├── icon.png                        # Tùy chọn: App Icon file
│   ├── apple-icon.png                  # Tùy chọn: Apple App Icon file
│   ├── opengraph-image.png             # Tùy chọn: Open Graph image file
│   ├── twitter-image.png               # Tùy chọn: Twitter image file
│   ├── sitemap.xml                     # Tùy chọn: Sitemap file
│   ├── robots.txt                      # Tùy chọn: Robots file
│   └── (tên-thư-mục)/                 # Tùy chọn: Thư mục cho các routes con
│       ├── page.tsx                    # Bắt buộc nếu có route con
│       ├── layout.tsx                  # Tùy chọn: Layout riêng cho route con
│       ├── loading.tsx                 # Tùy chọn
│       ├── error.tsx                   # Tùy chọn
│       ├── not-found.tsx               # Tùy chọn
│       ├── global-error.tsx            # Tùy chọn: Global error UI
│       ├── not-found.tsx               # Tùy chọn: Trang 404
│       ├── route.tsx                   # Tùy chọn: API endpoint
│       ├── template.tsx                # Tùy chọn: Re-rendered layout
│       └── default.tsx                 # Tùy chọn: Parallel route fallback page
├── public/                             # Tùy chọn: Tệp tĩnh như hình ảnh, favicon
├── styles/                             # Tùy chọn: Tệp CSS cho ứng dụng
│   └── globals.css                     # Tùy chọn: CSS toàn cục
├── components/                         # Tùy chọn: Các thành phần React tái sử dụng
├── package.json                        # Bắt buộc: Thông tin dự án và phụ thuộc
├── next.config.js                      # Tùy chọn: Cấu hình Next.js
├── tsconfig.json                       # Bắt buộc: Cấu hình TypeScript
├── next-env.d.ts                       # Bắt buộc: Khai báo TypeScript cho Next.js
├── .eslintrc.json                      # Tùy chọn: Cấu hình ESLint
├── .gitignore                          # Tùy chọn: Tệp gitignore
├── .env                                # Tùy chọn: Biến môi trường
├── .env.local                          # Tùy chọn: Biến môi trường cục bộ
├── .env.production                     # Tùy chọn: Biến môi trường sản xuất
├── .env.development                    # Tùy chọn: Biến môi trường phát triển
├── middleware.ts                       # Tùy chọn: Middleware của Next.js
├── instrumentation.ts                  # Tùy chọn: OpenTelemetry và file instrumentation
└── jsconfig.json                       # Tùy chọn: Cấu hình JavaScript
```
### Định nghĩa routing

doc : <https://nextjs.org/docs/app/building-your-application/routing/defining-routes>

#### Static Route (router tĩnh)

mặc định nextjs sử dụng thư mục được tạo để tạo các router, mỗi folder đại diện cho url. và file mặc định sẽ là `page.tsx` or `page.jsx` or `page.js`
ví dụ bạn muốn đường dẫn có dạng như dưới thì ta tạo folder như sau
```html
<!-- folder app gọi là Root Segment -->
app/page.tsx <!-- url:  / --> 
<!-- folder dashboard gọi là segment -->
app/dashboard/page.tsx<!-- url:  /dashboard --> 
<!-- folder products gọi là leaf segment -->
app/dashboard/products/page.tsx<!--url: /dashboard/products -->

```

file page.tsx 
```typescript 
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

Kết luận
- bạn muốn url như thế nào thì trong folder app tạo thư mục tương ứng với cấu trúc của url
- folder đó được hiểu là router khi và chỉ khi nó chứa file `page.tsx` or `page.jsx` or `page.js`
- `page.tsx` được xem như là EntryPoint, page chấp nhận kiểu mở rộng `.js, .jsx, .tsx`, 
- page mặc định là Server Components nhưng bạn có thể chuyển qua Client Components
- pages có thể fetch data để lấy thông tin qua API <https://nextjs.org/docs/app/building-your-application/routing/pages#pages>

#### router group 

doc: <https://nextjs.org/docs/app/building-your-application/routing/route-groups>

- là cách tổ chức cấu trúc router nhưng không phát sinh segment(URL), để bạn phân vùng quản lý các router có tính năng liên quan đến 1 nhóm để tạo cấu trúc rõ ràng và dễ dàng duy trì trong dự án
- tạo folder sử dụng dấu `(folderName)`
- Ví dụ : 
```html
app/(shop)/category/page.tsx <!-- url:  /category --> 
```

#### dynamic Route (router động)

doc : <https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes>

1. mặc định

- khi bạn cần tạo 1 route động và linh hoạt dựa trên các tham số có thể thay đổi. điều này cho phép bạn xử lý các trang có nội dung đa dạng như blog post, chi tiết sản phẩm, trang tìm kiếm.
- tạo folder sử dụng dấu `[folderName]`
- params có thể là file `layout.tsx`, `app/blog/[slug]/page.tsx`, `route.ts`, `app/products/[id]/page.tsx`
- slug được là param và giá trị của nó biến động theo phần segment phía sau /blog/ khi bạn truyền lên URL.
- ví dụ : ta có `app/blog/[slug]/page.tsx`

```tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
```

| Route                | Example URL | Params          |
|----------------------|-------------|-----------------|
| app/blog/[slug]/page.js | /blog/a     | { slug: 'a' }   |
| app/blog/[slug]/page.js | /blog/b     | { slug: 'b' }   |
| app/blog/[slug]/page.js | /blog/c     | { slug: 'c' }   |


2. catch-all segments ( mở rộng phần slug động lấy all phía sau)

bạn có thể mở rộng để lấy được parans tất cả ở phía sau, bằng cách sử dụng thêm dấu ... `[...slug]`

| Route                    | Example URL | Params                  |
|--------------------------|-------------|-------------------------|
| app/shop/[...slug]/page.js | /shop/a     | { slug: ['a'] }         |
| app/shop/[...slug]/page.js | /shop/a/b   | { slug: ['a', 'b'] }    |
| app/shop/[...slug]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] }|

3. Optional Catch-all Segments ( tùy chọn phần slug)

có thể tùy chọn phần mở rộng để so sánh {} nếu k có thì Params vẫn được chọn , bằng cách sử dụng dấu thêm dấu [] `[[...slug]]`


| Route                         | Example URL | Params                  |
|-------------------------------|-------------|-------------------------|
| app/shop/[[...slug]]/page.js  | /shop       | {}                      |
| app/shop/[[...slug]]/page.js  | /shop/a     | { slug: ['a'] }         |
| app/shop/[[...slug]]/page.js  | /shop/a/b   | { slug: ['a', 'b'] }    |
| app/shop/[[...slug]]/page.js  | /shop/a


#### Route handlers

doc: <https://nextjs.org/docs/app/building-your-application/routing/route-handlers>

Route handlers cho phép bạn tạo ra request và response API, nó có thể làm công việc backend, tạo ra hệ thống restful api như nodejs và expressjs

ví dụ về resoure api users
`api/users/route.ts` như sau:
```ts
const users = [
  { id: 1, name: "David" },
  { id: 2, name: "Tom" },
];
//GET api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  // query is "Tom" for /api/users?name=Tom

  /**
   * Ở đây bạn có thể liên kết trược tiếp với Dababase
   * Hoặc có thể gọi API
   *  */

  //getAll
  return Response.json(users);
}

//POST api/users

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body);
}
```
`api/users/[id]/route.ts` như sau:

```ts
const users = [
  { id: 1, name: "David" },
  { id: 2, name: "Tom" },
];
//GET api/users/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("API users/:id", id);
  /**
   * Ở đây bạn có thể liên kết trược tiếp với Dababase
   * Hoặc có thể gọi API
   *  */
  //getById
  if (id) {
    const user = users.find((u) => u.id == parseInt(id));
    return Response.json(user);
  }
  return Response.json({
    message: "ID not undefined",
  });
}

//PUT api/users/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {}

//DELETE api/users/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {}
```

#### Link and Navigation
Doc :<https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating>
có 4 cách sử dụng navigation route trong nextjs
- sử dụng `<Link>` component
- sử dụng `useRouter` hook(client component)
- sử dụng `redirect` function (server component)
- sử dụng native `history api`

1. Link component

- <Link> là 1 component được mở rộng từ tag `<a>` trong html để làm navigation route.
- cách dùng: import Link từ `next/link` và thêm attr `href` như tag `a` trong html
- ví dụ 
```ts
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```
2. useRouter() hook

Hook này chỉ cho phép sử dụng trong `client component`

```js
'use client' // khai báo sử dụng client component
 
import { useRouter } from 'next/navigation' // import useRouter
 
export default function Page() {
  const router = useRouter()// khai báo biến để dùng
// dùng router.push('/dashboard') để chuyển page
  return (
    <button type="button" onClick={() => router.push('/dashboard')}> 
      Dashboard
    </button>
  )
}
```
3. redirect function

- hàm này chỉ sử dụng trong server component. 

```tsx
import { redirect } from 'next/navigation' // import redirect
 
async function fetchTeam(id: string) {
  const res = await fetch('https://...') // gọi api để lấy thông tin
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id)
  // kiểm tra xem có dữ liệu trả về hay k? nếu k có thì chuyển sang trang login 
  if (!team) {
    redirect('/login')
  }
 
  // ...
}
```
chú ý
- mặc định , redirect sẽ return về status 307(Temporary Redirect). Trên server , nó sẽ return status về 303(See Other) sử dụng để chuyển hướng đến trang thành công sau 1 yêu cầu POST
- redirect không nằm trong khối try/catch, do nó ném 1 error nội bộ
- redirect cũng chấp nhận url tuyệt đối và link liên kết bên ngoài

#### 













