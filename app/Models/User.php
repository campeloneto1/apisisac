<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['perfil', 'graduacao', 'cidade', 'subunidade', 'setor'];


     public function perfil()
    {
        return $this->belongsTo(Perfil::class);
    }

    public function graduacao()
    {
        return $this->belongsTo(Graduacao::class);
    }

    public function cidade()
    {
        return $this->belongsTo(Cidade::class);
    }

    public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function setor()
    {
        return $this->belongsTo(Setor::class)->without(['subunidade']);
    }

    public function afastamentos()
    {

        return $this->hasMany(UserAfastamento::class, 'user_id')->without(['subunidade', 'user']);
    }

    public function ferias()
    {

        return $this->hasMany(UserFerias::class, 'user_id')->without(['subunidade', 'user']);
    }

    public function promocoes()
    {
        return $this->belongsToMany(Graduacao::class, 'users_promocoes', 'user_id', 'graduacao_id')->withPivot('id','data', 'boletim','tipo_id')->without(['user']);
        //return $this->hasMany(IrsoUser::class, 'user_id');
    }

    public function publicacoes()
    {
        return $this->hasMany(UserPublicacao::class, 'user_id')->without(['subunidade', 'user']);
    }

    public function irsos()
    {
        return $this->belongsToMany(Irso::class, 'irsos_users')->withPivot('id', 'atrasado', 'ausente', 'atestado')->without(['usuarios', 'subunidade']);
        //return $this->hasMany(IrsoUser::class, 'user_id');
    }

     public function escalas()
    {
        //return $this->belongsToMany(Escala::class, 'escalas_users', 'user_id', 'escala_id')->withPivot('id', 'modalidade_id', 'posto_id', 'turno_id', 'atrasado', 'ausente', 'atestado');
        return $this->hasMany(EscalaUser::class, 'user_id')->without(['user']);
    }

    public function armamentos()
    {
        return $this->hasMany(UserArmamento::class, 'user_id')->without(['user', 'subunidade']);
        //return $this->belongsToMany(Armamento::class, 'users_armamentos')->withPivot('id','danificado', 'extraviado','data_emp','data_dev', 'quant', 'observacoes')->without(['usuarios']);
        //return $this->hasMany(IrsoUser::class, 'user_id');
    }

     public function emprestimosveiculos()
    {
        return $this->belongsToMany(Veiculo::class, 'veiculos_emprestimos', 'user_id', 'veiculo_id')->withPivot('id','km_inicial', 'data_saida','hora_saida','data_chegada', 'hora_chegada', 'km_final')->without(['subunidade']);
        //return $this->hasMany(IrsoUser::class, 'user_id');
    }

    public function emprestimosmateriais()
    {
        return $this->belongsToMany(Material::class, 'materiais_emprestimos', 'user_id', 'material_id')->withPivot('id', 'data_saida','hora_saida','data_chegada', 'hora_chegada')->without(['subunidade']);
        //return $this->hasMany(IrsoUser::class, 'user_id');
    }

}
