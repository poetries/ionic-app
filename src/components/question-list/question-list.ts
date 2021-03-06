import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { ApiProvider } from '../../providers/api/api';
import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent  extends BaseUI {

  errorMessage: any;
  questions: string[];

  // datatype 外部传递进来，dataSourceType 本地接收之后的参数命名
  @Input('dataType') dataSourceType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
  }
  //这里没有 ionViewDidLoad 生命周期的函数
  ngAfterContentInit(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.api.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
          q => {
            this.questions = q;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}
