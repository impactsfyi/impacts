use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};
use uuid::Uuid;

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let unique_label = Uuid::new_v4().to_string();
            let win_builder =
                WebviewWindowBuilder::new(app, &unique_label, WebviewUrl::default())
                    .title(" ")
                    .inner_size(800.0, 600.0);

            // set transparent title bar only when building for macOS
            #[cfg(target_os = "macos")]
            let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

            let window = match win_builder.build() {
                Ok(window) => window,
                Err(e) => {
                    eprintln!("Failed to build window: {}", e);
                    return Ok(());
                }
            };

            // set background color only when building for macOS
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{NSColor, NSWindow};
                use cocoa::base::{id, nil};

                let ns_window = window.ns_window().unwrap() as id;
                unsafe {
                    let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                        nil,
                        0.0,
                        0.0,
                        0.0,
                        1.0
                    );
                    ns_window.setBackgroundColor_(bg_color);
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}