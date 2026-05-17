# YOLO Frontend

This is a Next.js 15 + TypeScript web application that provides a user interface for the [YOLO Object Detection Service](https://github.com/alonitac/YoloService). Users can upload images, trigger object detection, and view annotated results alongside a scored list of detected objects.

## Setup Instructions

1. Node.js should be already installed on your Ubuntu instance. If not, install it:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

2. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/alonitac/YoloFrontend.git
cd YoloFrontend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the project root and set the backend URL:

```bash
echo "YOLO_API_URL=http://localhost:8080" > .env.local
```

The `YOLO_API_URL` variable is server-side only — all requests to the YOLO API are proxied through Next.js at `/yolo/*`, so the backend URL is never exposed to the browser.

5. Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

Make sure the [YOLO Object Detection Service](https://github.com/alonitac/YoloService) is running before using the frontend.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `YOLO_API_URL` | `http://localhost:8080` | URL of the running YOLO FastAPI backend service. |

Example:

```bash
echo "YOLO_API_URL=http://<your_server_ip>:8080" > .env.local
npm run dev
```

## How It Works

1. User picks an image and clicks **Detect**
2. The image is `POST`ed to `/yolo/predict` (proxied to the backend)
3. The annotated image and detection list are fetched from `/yolo/prediction/{uid}`
4. The original image, the annotated image, and a scored object list are displayed side-by-side
