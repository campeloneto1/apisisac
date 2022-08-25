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
        return $this->belongsTo(Setor::class);
    }

    public function afastamentos()
    {
        return $this->hasMany(UserAfastamento::class, 'user_id');
    }


    public function publicacoes()
    {
        return $this->hasMany(UserPublicacao::class, 'user_id');
    }

    public function irsos()
    {
        return $this->hasMany(IrsoUser::class, 'user_id');
    }


}
