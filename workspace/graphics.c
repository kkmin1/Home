#include <graphics.h>

#include <math.h>

void main()

    {

        int GraphDriver=DETECT, GraphMode;

        char *line_style[]={ "SOLID_LINE",

                                        "DOTTED_LINE",

                                        "CENTER_LINE",

                                        "DASHED_LINE"

                                    };

        int i;

        initgraph(&GraphDriver, &GraphMode, "");

        settextstyle(TRIPLEX_FONT,HORIZ_DIR,1);

        for(i=0; i<80; i+=20)

            {

                setlinestyle(i/20,1,2);

                line(100,100+i, 200,100+i);

                outtextxy(250, 100+i, line_style[i/20]);

            }

        getch();

        closegraph();

    }