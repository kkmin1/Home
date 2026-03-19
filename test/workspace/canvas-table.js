function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

class CanvasTable {
  constructor(id, itemWidth, itemHeight, cols, rows) {
    this.element = document.getElementById(id);
    this.element.width = itemWidth * cols;
    this.element.height = itemHeight * rows;
    this.context = this.element.getContext('2d');
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.cols = cols;
    this.rows = rows;
    this.context.font = "12px Arial";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.lineWidth = 1;
    this.items = {};

    this.menuActivated = false;
    this.menuWidth = 20;
    this.menuItemHeight = 22;
    this.menuHeight = this.menuItemHeight;
    this.menuItems = [];

    this.element.addEventListener('click', this.onClick.bind(this), false);
  }

  onClick(event) {
    var {x: x, y: y} = getMousePos(this.element, event);

    if (!this.menuActivated) {
      var col = ((x / this.itemWidth) | 0);
      var row = ((y / this.itemHeight) | 0);
      var colRow = row * this.cols + col;

      if (typeof this.items[colRow] !== "undefined" && this.items[colRow].menuEnabled) {
        this.menuActivated = true;

        let menuX;
        if (x + this.menuWidth > this.itemWidth * this.cols) {
          menuX = x - this.menuWidth;
        } else {
          menuX = x;
        }

        this.drawMenu(this.items[colRow], menuX, y);
      }
    } else {
      this.hideMenu();
      this.menuActivated = false;
      this.menuClick(x, y);
    }
  }

  insertItem(col, row, value, menuEnabled) {
    this.items[row * this.cols + col] = {
      col: col,
      row: row,
      value: value,
      menuEnabled: menuEnabled
    }
  }

  drawGrid() {
    this.context.beginPath();
    for (let x = 0; x <= this.itemWidth * this.cols; x += this.itemWidth) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.itemHeight * this.rows);
    }

    for (let y = 0; y <= this.itemHeight * this.rows; y += this.itemHeight) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.itemWidth * this.cols, y);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();
  }

  drawItem(item) {
    var x = item.col * this.itemWidth + this.itemWidth / 2;
    var y = item.row * this.itemHeight + this.itemHeight / 2;
    this.context.fillText(item.value, x, y);
  }

  draw() {
    this.drawGrid();

    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        this.drawItem(this.items[key]);
      }
    }
  }

  insertMenuItem(value) {
    this.menuItems.push(value);
    var menuItemWidth = (this.context.measureText(value).width + 20) | 0;
    console.log(value, menuItemWidth, this.menuWidth);
    if (this.menuWidth < menuItemWidth) {
      this.menuWidth = menuItemWidth;
    }

    this.menuHeight += this.menuItemHeight;
  }

  hideMenu() {
    this.context.clearRect(this.menuX - 1, this.menuY - 1, this.menuWidth + 2, this.menuHeight + 2);
    this.draw();
  }

  drawMenu(item, x, y) {
    this.menuX = x;
    this.menuY = y;
    this.context.beginPath();
    this.context.clearRect(x, y, this.menuWidth, this.menuHeight);
    this.context.rect(x, y, this.menuWidth, this.menuHeight);

    /* draw menu grid */
    for (let yOff = 0; yOff < this.menuHeight; yOff += this.menuItemHeight) {
      this.context.moveTo(x, y + yOff);
      this.context.lineTo(x + this.menuWidth, y + yOff);
    }

    this.context.stroke();

    /* draw menu title */
    this.context.fillText(item.value, x + this.menuWidth / 2, y + this.menuItemHeight / 2);

    /* draw menu items */
    for (let i = 0; i < this.menuItems.length; i++) {
      var textX = x + this.menuWidth / 2;
      var textY = y + this.menuItemHeight + i * this.menuItemHeight + this.menuItemHeight / 2;
      this.context.fillText(this.menuItems[i], textX, textY);
    }
  }

  menuClick(x, y) {
    if ((x > this.menuX && x < this.menuX + this.menuWidth) &&
      (y > this.menuY + this.menuItemHeight && y < this.menuY + this.menuHeight)) {
      let itemN = ((y - this.menuY) / this.menuItemHeight) | 0;
      alert("Item " + itemN + " clicked");
    }
  }
}
