class clear {
  public static void main(String args[]) {
    System.out.println("hello java");
    clearScreen();

  }


  public static void clearScreen() {
    for (int i = 0; i < 80; i++)
      System.out.println("");
  }

}