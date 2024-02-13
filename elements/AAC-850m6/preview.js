function(instance, properties) {
  jQuery("html").height("100%").css("min-height", 50).css("overflow", "hidden");
  jQuery("body").height("100%").css("min-height", 50).css("overflow", "hidden");

  const head = jQuery("head");

  const $script = jQuery(`<script/>`);
  head.append($script);

  $script[0].addEventListener("load", async function () {
    let iconName = (properties.icon || "simple-icons:iconify").trim();

    const IconifyIcon = window.customElements.get("iconify-icon");
    try {
      await IconifyIcon.loadIcon(iconName);
      if (!IconifyIcon.iconExists(iconName)) {
        iconName = "simple-icons:iconify";
      }
    } catch (err) {
      iconName = "simple-icons:iconify";
    }

    const id = "iconify-" + Math.random().toString(36).substr(2, 5);

    const flipX = properties.flipx ? 180 : 0;
    const flipY = properties.flipy ? 180 : 0;
    const { rotate, color, transition, use_font_color } = properties;

    const icon = jQuery(`<iconify-icon id="${id}"></iconify-icon>`);
    const styleSheet = jQuery(`<style></style>`);

    instance.canvas.append(styleSheet).append(icon);
    instance.canvas.css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    const {
      width,
      padding_horizontal,
      border_width,
      border_style,
      border_width_right,
      border_width_left,
      four_border_style,
      border_style_right,
      border_style_left,
    } = properties.bubble;

    let totalBorderWidth = 0;
    if (!four_border_style()) {
      if (border_style() === "none") {
        totalBorderWidth = 0;
      } else {
        totalBorderWidth = border_width() * 2;
      }
    } else {
      const widthRight =
        border_style_right() === "none" ? 0 : border_width_right();
      const widthLeft =
        border_style_left() === "none" ? 0 : border_width_left();
      totalBorderWidth = widthLeft + widthRight;
    }

    const windowWidth = instance.canvas.width();
    let iconWidth = windowWidth;
    icon.attr("icon", iconName);
    icon.attr("width", iconWidth);

    const styleSheetHtml = `
                    #${id} {
                        width: 100%;
                        height: 100%;
                        color: ${
                          use_font_color
                            ? properties.bubble.font_color()
                            : color
                        };
                        transform: rotate(${rotate}deg) rotateX(${flipX}deg) rotateY(${flipY}deg);
                        transition: ${transition};
                    }
                    #${id}.spin {
                        animation: ${id} 2s infinite linear;
                    }
                    @keyframes ${id} {
                        from {
                            transform: rotate(0deg);
                        } 
                        to {
                            transform: rotate(359deg);
                        }
                    }
            `;

    styleSheet.html(styleSheetHtml);
  });
  $script[0].src =
    "https://code.iconify.design/iconify-icon/1.0.3/iconify-icon.min.js";
}
