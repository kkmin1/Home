
프라이스 방정식과 다중수준 선택에 관하여
Seldon
2010. 6. 18. 00:00

윌슨의 다중수준 선택(multi-level selection; MS)을 전체 집단의 C의 평균보수와 D의 평균보수를 비교하는 부등식만 써놓고 끝냈는데, 더 구체적으로 써보려고 합니다.

M개의 집단이 있고 각 집단의 개체수가 n이라고 하면 전체 개체수 N은 Mn이겠죠. 이 중 C의 개체수는 다음처럼 씌어집니다.

$$N^C=\sum_j p_jn_j=\overline{p_j}N,\ N^D=N-N^C,\ \overline{x_j}\equiv \frac{1}{M}\sum_{j=1}^Mx_j$$

맨 오른쪽 식은 어떤 변수 위에 긴 줄을 씌운 것에 대한 정의입니다. 각 집단에서 게임을 하고나서 번식(즉 개체수 변화)을 하기 전에 먼저 전체 집단의 C의 평균보수를 먼저 구합니다.

$$\pi^C=\frac{\sum_jp_j\pi_j^Cn_j}{\sum_j p_jn_j}=\frac{\overline{p_j\pi_j^C}}{\overline{p_j}}$$

비슷하게 πD도 구합니다. 이제 이걸 이용해서 '번식'을 시킵니다.

$$N'^C=\pi^CN^C,\ N'^D=\pi^DN^D$$

$$\bar p'_{\rm MS}=\frac{N'^C}{N'^C+N'^D}=\frac{\overline{p_j}\pi^C}{\overline{p_j}\pi^C+\overline{1-p_j}\pi^D}$$

이제 프라이스 방정식(Price equation; 역시 제멋대로 줄여서 PE)을 다시 볼까요. 역시 M개의 집단에 총 N명의 개체수가 있는 경우를 봅니다. 여기서는 각 집단 j에서 번식을 먼저 시키죠.

$$n'^C_j=p_j\pi^C_jn_j,\ n'_j=\pi_jn_j$$

이 결과를 모아서 전체 집단에서 C의 비율을 얻습니다.

$$\bar p'_{\rm PE}=\frac{\sum_j n'^C_j}{\sum_j n'_j}=\frac{\overline{p_j\pi^C_j}}{\overline{\pi_j}}$$

이걸 위의 pMS와 비교해보면 완전히 같습니다. 바로 πC의 정의로부터 그렇습니다. 전체 집단의 C의 평균보수란 결국 각 집단 내의 C의 보수들을 모두 모아서 평균낸 거니까요.

여전히 좀 찜찜한데, 그 이유가 뭔지 개체 입장에서 보겠습니다. 어떤 집단에 속한 D 개체를 생각합시다. 이 D가 C를 갖는 다른 개체 하나를 랜덤하게 골라서 자신보다 보수가 높으면 D에서 C로 바꾸고 아님 말고라고 합시다. 이 D가 속한 집단 안에서만 C 개체를 고르는 경우와 전체 집단에서 C를 고르는 경우, 어느 경우일 때 D에서 C로 바꾸기 더 쉬워질까요. 처음에는 후자가 더 쉬울 거라고 생각했고, 그래서 PE와 MS의 결과가 달라져야 할 것이라고 생각했습니다. 전체 집단에서 고른다면 더 큰 보수의 C를 고를 가능성이 높아지기 때문이라고 생각했는데, 사실 동시에 더 작은 보수의 C를 고를 가능성도 높아집니다. 그래서 결국 '평균적으로'는 집단 안에서 고르든, 전체 집단에서 고르든 차이가 없다.라고 결론을 내렸습니다. 그게 PE와 MS의 결과가 다르지 않은 이유입니다.


