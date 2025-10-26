// Linked List Node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Linked List Class
class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtEnd(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = newNode;
    }
    this.display(`Inserted ${value}`);
  }

  deleteNode(value) {
    if (!this.head) {
      this.display("List is empty!");
      return;
    }

    if (this.head.value == value) {
      this.head = this.head.next;
      this.display(`Deleted ${value}`);
      return;
    }

    let curr = this.head;
    while (curr.next && curr.next.value != value) curr = curr.next;

    if (curr.next) {
      curr.next = curr.next.next;
      this.display(`Deleted ${value}`);
    } else {
      this.display(`Node ${value} not found`);
    }
  }

  search(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value == value) {
        this.highlightNode(value);
        this.display(`Node ${value} found`);
        return;
      }
      curr = curr.next;
    }
    this.display(`Node ${value} not found`);
  }

  traverse() {
    if (!this.head) {
      this.display("List is empty!");
      return;
    }
    this.display("Traversing...");
    const nodes = document.querySelectorAll(".node");
    let i = 0;

    const interval = setInterval(() => {
      nodes.forEach((n) => n.classList.remove("active"));
      if (i < nodes.length) {
        nodes[i].classList.add("active");
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  render() {
    const visualizer = document.getElementById("visualizer");
    visualizer.innerHTML = "";
    let curr = this.head;

    while (curr) {
      const nodeDiv = document.createElement("div");
      nodeDiv.classList.add("node");
      nodeDiv.textContent = curr.value;
      visualizer.appendChild(nodeDiv);

      if (curr.next) {
        const arrow = document.createElement("span");
        arrow.classList.add("arrow");
        arrow.innerHTML = "➜";
        visualizer.appendChild(arrow);
      }

      curr = curr.next;
    }
  }

  display(message) {
    this.render();
    document.getElementById("statusMsg").textContent = message;
  }

  highlightNode(value) {
    const nodes = document.querySelectorAll(".node");
    nodes.forEach((n) => {
      if (n.textContent == value) {
        n.classList.add("found");
        setTimeout(() => n.classList.remove("found"), 1000);
      }
    });
  }
}

// Instantiate Linked List
const list = new LinkedList();

// Hook UI buttons
function insertAtEnd() {
  const val = document.getElementById("inputValue").value.trim();
  if (val) list.insertAtEnd(val);
  document.getElementById("inputValue").value = "";
}

function deleteNode() {
  const val = document.getElementById("inputValue").value.trim();
  if (val) list.deleteNode(val);
  document.getElementById("inputValue").value = "";
}

function searchNode() {
  const val = document.getElementById("inputValue").value.trim();
  if (val) list.search(val);
  document.getElementById("inputValue").value = "";
}

function traverse() {
  list.traverse();
}
